@echo off
chcp 65001 >nul
echo =========================================================
echo   SkyFlow - สคริปต์ส่งโค้ดขึ้น GitHub (67160359-buu/SkyFlow)
echo =========================================================
echo.

set TOKEN=
if exist .git-token (
    set /p TOKEN=<.git-token
)

echo [1/3] บันทึกการเปลี่ยนแปลงล่าสุด...
git add .
git commit -m "feat: update SkyFlow latest changes" >nul 2>nul

echo [2/3] กำลังเชื่อมต่อไปยัง GitHub...
if defined TOKEN (
    git push "https://67160359-buu:%TOKEN%@github.com/67160359-buu/SkyFlow.git" main
) else (
    git push origin main
)

if %errorlevel% neq 0 (
    echo.
    echo =========================================================
    echo ⚠️ การ Push ล้มเหลว กรุณาตรวจสอบอินเทอร์เน็ตหรือ Token
    echo =========================================================
) else (
    echo.
    echo =========================================================
    echo ✅ สำเร็จ 100%! โค้ดทั้งหมดถูกส่งขึ้น GitHub เรียบร้อยแล้ว
    echo ไปที่ https://render.com เพื่อดูการ Deploy หรือใช้งานเว็บได้เลย!
    echo =========================================================
)

echo.
pause
