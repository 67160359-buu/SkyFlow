# 🚀 SkyFlow — คู่มือการนำขึ้นใช้งานจริง (Production Deployment Guide)

เอกสารนี้รวบรวมขั้นตอนและแนวทางปฏิบัติในการ Deploy ระบบ **SkyFlow** ขึ้นใช้งานบน Production, Cloud VPS, หรือเซิร์ฟเวอร์จริงอย่างเป็นระบบ ปลอดภัย และเสถียร

---

## 📁 โครงสร้างไฟล์สำหรับ Deployment

| ไฟล์ | รายละเอียด |
| :--- | :--- |
| [`render.yaml`] | คอนฟิก Render Blueprint สำหรับ Deploy บน Cloud ฟรี 100% ในคลิกเดียว |
| [`DEPLOY_RENDER.md`]| **คู่มือการนำขึ้น Cloud (Render.com + Neon.tech ฟรี 100% ตลอดชีพ)** |
| [`docker-compose.yml`]| คอนฟิกหลักสำหรับ Docker Compose พร้อม Healthcheck และ Network isolation |
| [`docker-compose.prod.yml`]| คอนฟิก Production พร้อม Nginx Reverse Proxy (พอร์ต 80/443) และ Security Headers |
| [`Dockerfile`] | คอนฟิกสร้าง Image ขนาดเล็กด้วย Node 18 Alpine และ In-container Healthcheck |
| [`.env.example`] | เทมเพลตค่าคอนฟิก Environment Variables ทั้งหมด (รองรับ DATABASE_URL) |
| [`deploy.sh`] | สคริปต์รัน Deploy อัตโนมัติในคลิกเดียวสำหรับ Linux / macOS / Cloud VPS |
| [`deploy.bat`] | สคริปต์รัน Deploy อัตโนมัติสำหรับ Windows |
| [`nginx/nginx.conf`] | การตั้งค่า Nginx Reverse Proxy, Gzip Compression และ Security Headers |
| [`.github/workflows/deploy.yml`] | CI/CD Pipeline สำหรับ GitHub Actions |

---

## ☁️ วิธีที่ 1: Deploy บน Cloud ฟรี 100% (Render.com) ⭐️ แนะนำที่สุด
หากต้องการให้เว็บออนไลน์บนอินเทอร์เน็ตจริง มีโดเมน HTTPS ทันที และฟรี 100%:
👉 **อ่านคู่มือฉบับเต็มได้ที่:** [`DEPLOY_RENDER.md`]

**สรุปวิธีทำใน 3 ขั้นตอน:**
1. นำโค้ดขึ้น GitHub Repository
2. เข้าไปที่ [Render.com](https://render.com) ➔ กด **New +** ➔ เลือก **Blueprint** หรือ **Web Service**
3. เชื่อมต่อ Repo แล้วกด Deploy ได้ทันที! (เว็บจะได้ URL เช่น `https://skyflow-app.onrender.com`)

### บน Linux / macOS / Cloud VPS:
```bash
chmod +x deploy.sh
./deploy.sh
```

### บน Windows:
ดับเบิลคลิกไฟล์ `deploy.bat` หรือรันผ่าน PowerShell:
```powershell
.\deploy.bat
```

หรือใช้คำสั่งมาตรฐาน Docker:
```bash
docker compose up -d --build
```

เข้าใช้งานหน้าเว็บได้ทันทีที่:
- **หน้าจองเที่ยวบิน (Flight Page):** `http://localhost:3000/flight.html`
- **หน้าระบบสมาชิก (Auth Portal):** `http://localhost:3000/index.html`
- **ระบบตรวจสอบความพร้อม (Health Check):** `http://localhost:3000/api/health`

---

## 🌐 วิธีที่ 2: Deploy บน Cloud VPS (Ubuntu / Debian / AWS EC2 / DigitalOcean)

### ขั้นตอนที่ 1: ติดตั้ง Docker & Docker Compose บน VPS
เชื่อมต่อ SSH เข้าสู่ Server ของคุณ จากนั้นรันคำสั่ง:
```bash
# อัปเดตแพ็กเกจ
sudo apt update && sudo apt upgrade -y

# ติดตั้ง Docker & Docker Compose Plugin
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
```
*(ทำการออกจากระบบและ SSH เข้าใหม่ 1 ครั้งเพื่อให้สิทธิ์ group docker มีผล)*

### ขั้นตอนที่ 2: โคลนโค้ดและตั้งค่าตัวแปรระบบ
```bash
git clone https://github.com/67160359-buu/SkyFlow.git skyflow-app
cd skyflow-app

# คัดลอกและแก้ไขไฟล์ .env
cp .env.example .env
nano .env
```
> **ข้อแนะนำ:** แก้ไข `JWT_SECRET` และ `DB_PASSWORD` เป็นรหัสผ่านที่คาดเดายากบน Production

### ขั้นตอนที่ 3: สั่งรัน Production Mode (พร้อม Nginx Reverse Proxy)
```bash
docker compose -f docker-compose.prod.yml up -d --build
```

---

## 🔒 วิธีที่ 3: ติดตั้ง HTTPS / Free SSL (Let's Encrypt) บน VPS

หากมีโดเมนของตนเอง (เช่น `skyflow.yourdomain.com`) และชี้ A Record มายัง IP ของ VPS เรียบร้อยแล้ว:

```bash
# ติดตั้ง Certbot
sudo apt install certbot python3-certbot-nginx -y

# ดึงใบรับรอง SSL อัตโนมัติ
sudo certbot --nginx -d skyflow.yourdomain.com
```

---

## 🛠️ การตรวจสอบและดูแลรักษาระบบ (Maintenance & Commands)

### 1. ดูสถานะและ Log ของบริการ:
```bash
# ดูสถานะคอนเทนเนอร์ทั้งหมด
docker compose ps

# ดู Live Log ของระบบ API
docker compose logs -f api

# ดู Live Log ของฐานข้อมูล PostgreSQL
docker compose logs -f postgres
```

### 2. ตรวจสอบสถานะความพร้อม (Health Check):
```bash
curl http://localhost:3000/api/health
```
ผลลัพธ์ตอบกลับ:
```json
{
  "status": "ok",
  "service": "skyflow-api",
  "uptime": 3600,
  "timestamp": "2026-10-09T14:30:00.000Z",
  "database": "connected"
}
```

### 3. สำรองข้อมูลฐานข้อมูล (Database Backup):
```bash
# Export ข้อมูลทั้งหมดในฐานข้อมูลออกมาเป็นไฟล์ .sql
docker exec skyflow-app-postgres pg_dump -U postgres skyflow_db > backup_$(date +%Y%m%d).sql

# กู้คืนข้อมูล (Restore)
cat backup_20261009.sql | docker exec -i skyflow-app-postgres psql -U postgres -d skyflow_db
```

### 4. อัปเดตเวอร์ชันใหม่เมื่อมีการแก้ไขโค้ด:
```bash
git pull
docker compose up -d --build
```
*(ระบบจะทำ Zero-downtime container replacement ให้อัตโนมัติ)*
