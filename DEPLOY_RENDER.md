# ☁️ SkyFlow — คู่มือการนำขึ้น Cloud (Render.com ฟรี 100%)

คู่มือนี้จัดทำขึ้นสำหรับการนำระบบ **SkyFlow** ขึ้นโฮสต์บน **Render.com** ใช้งานได้จริงบนอินเทอร์เน็ต **ฟรี 100% โดยไม่ต้องผูกบัตรเครดิต**

---

## 🌟 จุดเด่นของการ Deploy บน Render.com
- ✅ **ฟรี 100% (Free Tier):** ได้ 750 ชั่วโมง/เดือน (รันได้ตลอดทั้งเดือน 24/7 สำหรับ 1 บริการ)
- ✅ **HTTPS / SSL อัตโนมัติ:** ได้โดเมนฟรี เช่น `https://skyflow-app.onrender.com`
- ✅ **Auto Deploy (CI/CD):** เมื่อแก้โค้ดแล้ว `git push` ขึ้น GitHub ระบบ Render จะอัปเดตเว็บใหม่อัตโนมัติทันที
- ✅ **รองรับ Node.js Native & Docker:** ทำงานรวดเร็ว ใช้ทรัพยากรคุ้มค่า

> **เกี่ยวกับฐานข้อมูล (Database):**
> - **Render PostgreSQL Free:** ใช้งานได้ฟรี แต่ระบบของ Render กำหนดให้มีอายุ 30 วัน
> - **Neon.tech PostgreSQL (แนะนำอย่างยิ่ง):** ฟรี 100% **ตลอดชีพ ไม่หมดอายุ** (0.5 GB) ไม่ต้องผูกบัตรเครดิต ทำงานร่วมกับ Render ได้เสถียรที่สุด

---

## 🚀 สรุป 2 วิธีการ Deploy

| วิธี | ความยาก | การหมดอายุของ DB | เหมาะสำหรับ |
| :--- | :---: | :---: | :--- |
| **วิธีที่ 1: Render Web Service + Neon.tech (แนะนำ ⭐️⭐️⭐️⭐️⭐️)** | ง่ายมาก (3 นาที) | **ไม่มีวันหมดอายุ (ฟรีตลอดชีพ)** | ใช้งานจริง ถาวร ไม่ต้องกังวลเรื่อง DB โดนลบ |
| **วิธีที่ 2: Render Blueprint (1-Click Deploy ผ่าน `render.yaml`)** | คลิกเดียวจบ | DB ฟรี 30 วันแรก | พรีเซนต์งาน ส่งโปรเจกต์ ทดสอบระบบด่วน |

---

## 📌 ขั้นตอนเตรียมโค้ดขึ้น GitHub (ทำครั้งแรก)

Render.com จะดึงโค้ดจาก **GitHub Repository** ของคุณ ดังนั้นต้องนำโปรเจกต์นี้ขึ้น GitHub ก่อน:

1. เปิด PowerShell ที่โฟลเดอร์โปรเจกต์นี้ แล้วรันคำสั่ง:
```powershell
# 1. สร้าง Git repository
git init

# 2. เพิ่มไฟล์ทั้งหมดเข้า git
git add .

# 3. บันทึก commit
git commit -m "feat: SkyFlow ready for Render.com deployment"

# 4. เปลี่ยนชื่อ branch เป็น main
git branch -M main

# 5. เชื่อมต่อกับ GitHub Repo ของคุณ (สร้าง repo ใหม่บน github.com ก่อน)
git remote add origin https://github.com/67160359-buu/SkyFlow.git

# 6. Push โค้ดขึ้น GitHub
git push -u origin main
```
*(หากยังไม่มี GitHub Repo ให้เข้า [github.com/new](https://github.com/new) แล้วสร้าง repo ชื่อ `skyflow-app`)*

---

## 🏆 วิธีที่ 1 (แนะนำที่สุด): Render + Neon.tech (ฟรี 100% ตลอดชีพ)

### ตอนที่ 1: สร้างฐานข้อมูลฟรีบน Neon.tech (ใช้เวลา 1 นาที)
1. ไปที่ [neon.tech](https://neon.tech) แล้วกด **Sign Up** (ล็อกอินด้วยบัญชี GitHub ได้ทันที)
2. กด **Create Project** ตั้งชื่อว่า `skyflow-db` แล้วเลือก Region: **Singapore (ap-southeast-1)** หรือใกล้เคียง
3. เมื่อสร้างเสร็จ ที่หน้า Dashboard จะมีหัวข้อ **Connection string** ให้คลิก **Copy** URL มา (ตัวอย่างรูปแบบ):
   ```text
   postgresql://neondb_owner:npg_xxxxxxxx@ep-quick-xxxx.ap-southeast-1.neon.tech/neondb?sslmode=require
   ```

### ตอนที่ 2: สร้าง Web Service บน Render.com (ใช้เวลา 2 นาที)
1. เข้าไปที่ [dashboard.render.com](https://dashboard.render.com) แล้วล็อกอินด้วย GitHub
2. กดปุ่ม **New +** ที่มุมขวาบน ➔ เลือก **Web Service**
3. เลือก Repository `skyflow-app` ของคุณที่เพิ่ง Push ขึ้นไป ➔ กด **Connect**
4. ตั้งค่าหน้าฟอร์มดังนี้:
   - **Name:** `skyflow-app` (หรือชื่ออะไรก็ได้ที่ต้องการ)
   - **Region:** `Singapore` (เพื่อให้โหลดเร็วจากไทย)
   - **Branch:** `main`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** เลือก **Free** ($0/month)
5. เลื่อนลงมาที่หัวข้อ **Environment Variables** กดปุ่ม **Add Environment Variable** และเพิ่ม 3 ค่านี้:

| Key | Value | คำอธิบาย |
| :--- | :--- | :--- |
| `DATABASE_URL` | *(วาง Connection string ที่ก๊อปปี้มาจาก Neon)* | เชื่อมต่อ Postgres อัตโนมัติ |
| `JWT_SECRET` | `skyflow_secret_production_key_2026` | คีย์เข้ารหัส Token (ตั้งเองได้) |
| `FLIGHTAPI_KEY` | `6abe10cfe1ceafff6e5b16d3` | API Key ค้นหาเที่ยวบินจริง |

6. กดปุ่ม **Create Web Service** ด้านล่างสุด!
7. รอ Render ทำการ Build และ Deploy ประมาณ 1–2 นาที เมื่อขึ้นสถานะ **Live** สีเขียว แปลว่าสำเร็จแล้ว! 🎉

---

## ⚡ วิธีที่ 2: Render Blueprint 1-Click (`render.yaml`)

หากต้องการให้ Render จัดการสร้างทั้ง Web Service และ PostgreSQL ให้ในคลิกเดียว:

1. ตรวจสอบว่าไฟล์ `render.yaml` ถูก push ขึ้น GitHub แล้ว
2. เข้าไปที่ [dashboard.render.com](https://dashboard.render.com)
3. กดปุ่ม **New +** ➔ เลือก **Blueprint**
4. เลือก Repository `skyflow-app`
5. Render จะอ่านไฟล์ `render.yaml` อัตโนมัติ และแสดงรายการ:
   - Web Service: `skyflow-app` (Free)
   - Database: `skyflow-db` (Free)
6. กด **Apply** ➔ ระบบจะ Provision ฐานข้อมูลและ Web Service ให้ทั้งหมดในครั้งเดียว

> ⚠️ Database ที่สร้างด้วยวิธีนี้บน Render Free Tier จะมีอายุ 30 วัน หากต้องการใช้งานยาวนาน แนะนำให้ใช้วิธีที่ 1 (Neon.tech)

---

## 🧪 การเข้าใช้งานและทดสอบระบบหลัง Deploy

เมื่อ Deploy สำเร็จ คุณจะได้รับ URL ประจำบริการ เช่น:
`https://skyflow-app-xxxx.onrender.com`

สามารถคลิกเข้าใช้งานได้ทันที:

### 1. หน้าค้นหาเที่ยวบิน (Flight Search):
```
https://skyflow-app-xxxx.onrender.com/flight.html
```
- ทดสอบค้นหาเที่ยวบินเส้นทางต่าง ๆ (เช่น BKK -> HND, BKK -> SIN, DMK -> CNX)
- ดูราคาจริง สายการบินจริง กราฟเปรียบเทียบราคา
- ทำการกดจองเที่ยวบินและเลือกที่นั่ง

### 2. หน้าระบบสมาชิกและยืนยันตัวตน (Auth Portal):
```
https://skyflow-app-xxxx.onrender.com/index.html
```
- สมัครสมาชิกใหม่ (Register)
- เข้าสู่ระบบ (Login)
- ล็อกอินแล้วระบบจะพาไปยังหน้าเที่ยวบินพร้อมดึงข้อมูลโปรไฟล์ผู้ใช้

### 3. ตรวจสอบสถานะเซิร์ฟเวอร์ & ฐานข้อมูล (Health Check):
```
https://skyflow-app-xxxx.onrender.com/api/health
```
เมื่อเปิดจะเห็น JSON ตอบกลับ:
```json
{
  "status": "ok",
  "service": "skyflow-api",
  "uptime": 120,
  "timestamp": "2026-10-09T16:00:00.000Z",
  "database": "connected"
}
```
หาก `database` ขึ้นว่า `"connected"` แสดงว่าระบบเชื่อมต่อ Cloud Database สำเร็จ 100%!

---

## 💡 ข้อควรรู้เกี่ยวกับ Free Tier บน Render.com (Tips & Tricks)

1. **พฤติกรรม Spin Down (Sleep Mode):**
   - บริการฟรีบน Render จะพักการทำงาน (Sleep) เมื่อไม่มีคนเข้าใช้งานเกิน 15 นาที
   - เมื่อมีคนเปิดเข้ามาใหม่ ระบบจะ Cold Start ปลุกตัวเองขึ้นมาใหม่ ใช้เวลาประมาณ 30-50 วินาทีในครั้งแรก หลังจากนั้นจะเร็วปกติ
2. **การป้องกัน Spin Down (ทำให้เว็บตื่นตลอดเวลาฟรี):**
   - สามารถใช้บริการฟรีอย่าง [cron-job.org](https://cron-job.org) หรือ [UptimeRobot](https://uptimerobot.com) ตั้งให้ Ping ไปที่ `https://skyflow-app-xxxx.onrender.com/api/health` ทุกๆ 10-14 นาที เพื่อไม่ให้เซิร์ฟเวอร์หลับได้
3. **การอัปเดตโค้ด:**
   - ทุกครั้งที่คุณแก้ไขโค้ด เพียงแค่รัน `git commit` และ `git push` ขึ้น GitHub Render จะตรวจจับและทำการ Deploy เวอร์ชันใหม่ให้ทันทีโดยอัตโนมัติ!
