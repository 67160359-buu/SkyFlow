const path = require('path');
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json());

const isProduction = process.env.NODE_ENV === 'production';
const hasDatabaseUrl = Boolean(process.env.DATABASE_URL);

// Database configuration supporting DATABASE_URL (Render, Neon, Supabase) and standard parameters
const poolConfig = hasDatabaseUrl
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_URL.includes('localhost') || process.env.DB_SSL === 'false'
        ? false
        : { rejectUnauthorized: false },
    }
  : {
      host: process.env.DB_HOST || (isProduction ? 'postgres' : 'localhost'),
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'skyflowpass',
      database: process.env.DB_NAME || 'skyflow_db',
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
    };

const pool = new Pool(poolConfig);

// Handle idle connection errors gracefully (prevents node process crashing on cloud timeouts)
pool.on('error', (err) => {
  console.error('⚠️ Unexpected idle PostgreSQL client error:', err.message);
});

const JWT_SECRET = process.env.JWT_SECRET || 'skyflow_secret_key_2024';

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access token required' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });
    req.user = user;
    next();
  });
}

async function initDB() {
  let retries = 5;
  while (retries > 0) {
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          username VARCHAR(50) UNIQUE,
          email VARCHAR(100) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          role VARCHAR(20) DEFAULT 'user',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);

      await pool.query(`
        CREATE TABLE IF NOT EXISTS login_logs (
          id SERIAL PRIMARY KEY,
          user_id INT REFERENCES users(id) ON DELETE CASCADE,
          username VARCHAR(50),
          ip_address VARCHAR(45),
          user_agent TEXT,
          status VARCHAR(20) NOT NULL,
          login_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);

      await pool.query(`
        CREATE TABLE IF NOT EXISTS bookings (
          id SERIAL PRIMARY KEY,
          booking_ref VARCHAR(20) UNIQUE NOT NULL,
          user_id INT REFERENCES users(id) ON DELETE SET NULL,
          passenger_name VARCHAR(100) NOT NULL,
          passenger_email VARCHAR(100) NOT NULL,
          passenger_phone VARCHAR(20),
          airline VARCHAR(100) NOT NULL,
          flight_code VARCHAR(20) NOT NULL,
          route VARCHAR(100) NOT NULL,
          dep_time VARCHAR(10),
          arr_time VARCHAR(10),
          total_price DECIMAL(10,2) NOT NULL,
          payment_method VARCHAR(50) NOT NULL,
          status VARCHAR(20) DEFAULT 'CONFIRMED',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);

      console.log('✅ Database connected and all tables initialized (users, login_logs, bookings)');
      break;
    } catch (err) {
      console.error(`⚠️ Database connection error: ${err.message}. Retrying... (${retries} left)`);
      retries--;
      if (retries === 0) {
        console.warn('⚠️ Maximum database connection retries reached. Server continues running. DB operations will resume once database is available.');
      } else {
        await new Promise(res => setTimeout(res, 3000));
      }
    }
  }
}

// Check Username Availability
app.get('/check-username/:username', async (req, res) => {
  try {
    const result = await pool.query('SELECT id FROM users WHERE username = $1', [req.params.username]);
    res.json({ available: result.rows.length === 0 });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Check Email Availability
app.get('/check-email/:email', async (req, res) => {
  try {
    const result = await pool.query('SELECT id FROM users WHERE email = $1', [req.params.email]);
    res.json({ available: result.rows.length === 0 });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Register Handlers
const handleRegister = async (req, res) => {
  const { name, username, email, password } = req.body || {};
  const fullName = name || username || 'User';
  const uname = username || name || (email ? email.split('@')[0] : 'user');

  if (!email || !password) {
    return res.status(400).json({ message: 'กรุณากรอก Email และ Password ให้ครบถ้วน' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO users (name, username, email, password) VALUES ($1, $2, $3, $4) RETURNING id, name, username, email, role',
      [fullName, uname, email, password]
    );
    res.status(201).json({ message: 'สมัครสมาชิกสำเร็จ', user: result.rows[0] });
  } catch (err) {
    console.error('Register error:', err);
    if (err.code === '23505') {
      return res.status(409).json({ message: 'Email หรือ Username นี้ถูกใช้งานไปแล้ว' });
    }
    res.status(500).json({ message: 'เกิดข้อผิดพลาดทางเซิร์ฟเวอร์', details: err.message });
  }
};

app.post('/register', handleRegister);
app.post('/api/auth/register', handleRegister);

// Login Handlers
const handleLogin = async (req, res) => {
  const { username, email, password } = req.body || {};
  const identity = username || email;
  const clientIp = String(req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').split(',')[0].trim().slice(0, 45);
  const userAgent = req.headers['user-agent'] || 'Unknown';

  if (!identity || !password) {
    return res.status(400).json({ message: 'กรุณากรอก Username/Email และ Password' });
  }

  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1 OR username = $1',
      [identity]
    );
    const user = result.rows[0];

    if (!user || user.password !== password) {
      try {
        await pool.query(
          'INSERT INTO login_logs (user_id, username, ip_address, user_agent, status) VALUES ($1, $2, $3, $4, $5)',
          [user ? user.id : null, String(identity).slice(0, 50), clientIp, userAgent, 'FAILED']
        );
      } catch (logErr) {
        console.error('Failed to write login log:', logErr.message);
      }
      return res.status(401).json({ message: 'Username/Email หรือ Password ไม่ถูกต้อง' });
    }

    // Record successful login
    try {
      await pool.query(
        'INSERT INTO login_logs (user_id, username, ip_address, user_agent, status) VALUES ($1, $2, $3, $4, $5)',
        [user.id, user.username || String(identity).slice(0, 50), clientIp, userAgent, 'SUCCESS']
      );
    } catch (logErr) {
      console.error('Failed to write login log:', logErr.message);
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, name: user.name, username: user.username, email: user.email, role: user.role }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดทางเซิร์ฟเวอร์' });
  }
};

app.post('/login', handleLogin);
app.post('/api/auth/login', handleLogin);

// Login History Endpoints
app.get('/api/my-logins', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, username, ip_address, user_agent, status, login_time FROM login_logs WHERE user_id = $1 ORDER BY login_time DESC LIMIT 50',
      [req.user.id]
    );
    res.json({ logs: result.rows });
  } catch (err) {
    console.error('Fetch login logs error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Bookings Endpoints
app.post('/api/bookings', async (req, res) => {
  const b = req.body || {};
  const {
    bookingRef, passengerName, passengerEmail, passengerPhone,
    airline, flightCode, route, depTime, arrTime, totalPrice, paymentMethod
  } = b;

  if (!passengerName || !passengerEmail || !airline || !flightCode || !route || totalPrice == null || !paymentMethod) {
    return res.status(400).json({ message: 'กรุณากรอกข้อมูลการจองให้ครบถ้วน' });
  }

  const ref = bookingRef || ('SF' + Math.random().toString(36).slice(2, 8).toUpperCase());

  let userId = null;
  const authHeader = req.headers['authorization'];
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      userId = decoded.id;
    } catch (e) { /* guest booking */ }
  }

  try {
    const result = await pool.query(
      `INSERT INTO bookings 
      (booking_ref, user_id, passenger_name, passenger_email, passenger_phone, airline, flight_code, route, dep_time, arr_time, total_price, payment_method, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING *`,
      [ref, userId, passengerName, passengerEmail, passengerPhone || null, airline, flightCode, route, depTime || null, arrTime || null, totalPrice, paymentMethod, 'CONFIRMED']
    );

    res.status(201).json({ message: 'บันทึกการจองสำเร็จ', booking: result.rows[0] });
  } catch (err) {
    console.error('Save booking error:', err);
    if (err.code === '23505') {
      return res.status(409).json({ message: 'รหัสการจองนี้มีอยู่แล้วในระบบ' });
    }
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการบันทึกการจอง', details: err.message });
  }
});

app.get('/api/my-bookings', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM bookings WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user.id]
    );
    res.json({ bookings: result.rows });
  } catch (err) {
    console.error('Fetch my bookings error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.get('/api/bookings/:ref', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM bookings WHERE booking_ref = $1', [req.params.ref.toUpperCase()]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'ไม่พบข้อมูลการจองนี้' });
    }
    res.json({ booking: result.rows[0] });
  } catch (err) {
    console.error('Fetch booking error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Health Check Endpoint for Docker & Monitoring
app.get(['/health', '/api/health'], async (req, res) => {
  let dbStatus = 'disconnected';
  try {
    const dbRes = await pool.query('SELECT 1');
    if (dbRes.rows.length > 0) dbStatus = 'connected';
  } catch (e) {
    dbStatus = 'error: ' + e.message;
  }

  const isHealthy = dbStatus === 'connected';
  res.status(200).json({
    status: isHealthy ? 'ok' : 'degraded',
    service: 'skyflow-api',
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    database: dbStatus
  });
});

app.use('/api', require('./flights-route'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', async () => {
  console.log(`🚀 SkyFlow Server running on port ${PORT}`);
  await initDB();
});
