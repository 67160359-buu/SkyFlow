# ✈️ SkyFlow — Flight Search Portal

ระบบค้นหาและเปรียบเทียบเที่ยวบินออนไลน์แบบครบวงจร รองรับ 200 สายการบินพันธมิตรทั่วโลก พร้อมเชื่อมต่อ Live FlightAPI และระบบฐานข้อมูลสมาชิก/ประวัติการจองด้วย PostgreSQL

## 👥 สมาชิกผู้จัดทำ
- นางสาวตัสนีม สะอิ 67160334
- นางสาวเพ็ญนภา เป็นเชื้อสาย 67160359

---

## 🐳 วิธีเปิดใช้งานด้วย Docker (แนะนำที่สุด ⭐)

สามารถสั่งรันทั้งระบบ (Node.js App + PostgreSQL Database) ได้ในคำสั่งเดียวผ่าน **Docker Desktop**:

### 1. เปิดระบบทั้งหมด
เปิด Terminal (หรือ PowerShell) ในโฟลเดอร์ `skyflow-app` แล้วรันคำสั่ง:
```bash
docker compose up --build
```
*(หากต้องการให้รันเป็น Background ในพื้นหลัง ให้ใส่ `-d` เช่น `docker compose up -d --build`)*

### 2. เข้าใช้งานระบบ
เมื่อระบบ Build และ Start เสร็จแล้ว เปิดเว็บเบราว์เซอร์ไปที่:
👉 **[http://localhost:3000](http://localhost:3000)** หรือ **[http://localhost:3000/flight.html](http://localhost:3000/flight.html)**

### 3. วิธีปิดการทำงาน
```bash
# ปิด Container ปกติ (ข้อมูลการจองและบัญชีผู้ใช้ใน Database ยังคงอยู่):
docker compose down

# หรือ ปิดพร้อมล้างข้อมูล Database ทั้งหมด:
docker compose down -v
```

---

## 💻 วิธีเปิดใช้งานแบบ Local (ผ่าน Node.js)

กรณีต้องการรันผ่าน Node.js โดยตรงในเครื่อง:

1. ติดตั้ง Dependencies:
   ```bash
   npm install
   ```
2. สร้างไฟล์การตั้งค่า `.env`:
   ```bash
   # Windows PowerShell:
   Copy-Item .env.example .env

   # macOS / Linux:
   cp .env.example .env
   ```
3. รันเซิร์ฟเวอร์:
   ```bash
   npm start
   ```
4. เปิดเบราว์เซอร์ไปที่ **http://localhost:3000**

---

## 🌐 ฟีเจอร์หลักของระบบ (Features)
- 🛫 **ตาราง 200 เที่ยวบินยอดนิยม (Flights Directory)**: ตรวจสอบเที่ยวบินทั่วโลก ค้นหาตามรหัส/เมือง กรองตามทวีป และคลิกจองได้ทันที
- ✈️ **ทำเนียบสายการบิน (Airlines Directory)**: ข้อมูลสายการบินพันธมิตรทั่วโลก พร้อมรหัส IATA และคะแนนรีวิว
- 🌐 **Live FlightAPI Integration**: เชื่อมต่อข้อมูลเที่ยวบินและตารางเวลาจริงผ่าน FlightAPI.io
- 🔒 **ระบบสมาชิก & ความปลอดภัย**: สมัครสมาชิก ล็อกอินด้วย JWT Token พร้อมบันทึกประวัติการเข้าสู่ระบบ (Login Logs)
- 📋 **ระบบจองเที่ยวบิน (Bookings)**: เลือกจองเที่ยวบิน กรอกข้อมูลผู้โดยสาร พร้อมจำลองการชำระเงิน (บัตรเครดิต, พร้อมเพย์ QR, โมบายแบงก์กิ้ง)
