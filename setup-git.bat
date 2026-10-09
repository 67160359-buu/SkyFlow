@echo off
chcp 65001 >nul
echo ====================================================
echo  SkyFlow - เตรียม Repository สำหรับ Deploy บน Render.com
echo ====================================================
echo.

where git >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] ไม่พบคำสั่ง Git ในเครื่องของคุณ
    echo กรุณาติดตั้ง Git ก่อนที่: https://git-scm.com/
    pause
    exit /b 1
)

if not exist .git (
    echo [1/4] สร้าง Git Repository ใหม่...
    git init
    git branch -M main
) else (
    echo [1/4] ตรวจพบ Git Repository เดิม
)

echo [2/4] เพิ่มไฟล์ทั้งหมดเข้า Git...
git add .

echo [3/4] บันทึก Commit...
git commit -m "feat: SkyFlow ready for Render.com deployment"

echo.
echo ====================================================
echo [4/4] โค้ดถูกเตรียมพร้อมเรียบร้อยแล้ว!
echo ====================================================
echo.
echo ขั้นตอนต่อไปในการนำขึ้น Render.com ฟรี 100%:
echo 1. ไปสร้าง Repository เปล่าที่ https://github.com/new
echo 2. เปิด Command Prompt หรือ PowerShell ในโฟลเดอร์นี้ แล้วรัน:
echo    git remote add origin https://github.com/YOUR_USERNAME/skyflow-app.git
echo    git push -u origin main
echo 3. ไปที่ https://render.com แล้วสร้าง Web Service ได้ทันที
echo.
echo ดูคู่มือฉบับเต็มได้ที่ไฟล์: DEPLOY_RENDER.md
echo.
pause
