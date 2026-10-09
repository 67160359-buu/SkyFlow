@echo off
chcp 65001 >nul
echo =========================================================
echo   SkyFlow - สคริปต์ส่งโค้ดขึ้น GitHub (67160359-buu/SkyFlow)
echo =========================================================
echo.

echo [1/3] บันทึกการเปลี่ยนแปลงล่าสุด...
git add .
git commit -m "feat: updated SkyFlow deployment configuration for Render.com" >nul 2>nul

echo [2/3] ตั้งค่า Remote URL...
git remote set-url origin https://github.com/67160359-buu/SkyFlow.git

echo [3/3] กำลัง Push ไปยัง GitHub (main branch)...
git push -u origin main

if %errorlevel% neq 0 (
    echo.
    echo =========================================================
    echo ⚠️ เกิดข้อผิดพลาดในการ Push (ติดสิทธิ์ Permission 403)
    echo =========================================================
    echo หากข้อความแจ้งว่า:
    echo   "Permission to 67160359-buu/SkyFlow.git denied to 67160165"
    echo.
    echo สาเหตุ: บัญชี GitHub ที่ล็อกอินอยู่ในเครื่องคือ "67160165"
    echo        แต่ Repo นี้เป็นของ "67160359-buu"
    echo.
    echo วิธีแก้ไข (เลือกข้อใดข้อหนึ่ง):
    echo ---------------------------------------------------------
    echo วิธีที่ 1 (ง่ายและถูกต้องที่สุด):
    echo   - ให้เจ้าของ Repo (67160359-buu) เปิดเว็บไปที่:
    echo     https://github.com/67160359-buu/SkyFlow/settings/access
    echo   - กดปุ่ม "Add people" แล้วเพิ่ม "67160165" เป็น Collaborator
    echo   - บัญชี 67160165 กดยอมรับคำเชิญทางอีเมล
    echo   - จากนั้นดับเบิลคลิกไฟล์ push-to-github.bat นี้ใหม่อีกครั้ง จะสำเร็จทันที!
    echo.
    echo วิธีที่ 2 (ใช้ GitHub Personal Access Token):
    echo   - สร้าง Token ที่: https://github.com/settings/tokens
    echo   - แล้วใช้คำสั่ง:
    echo     git push https://<TOKEN>@github.com/67160359-buu/SkyFlow.git main
    echo =========================================================
) else (
    echo.
    echo =========================================================
    echo ✅ สำเร็จ! โค้ดถูกส่งขึ้น GitHub เรียบร้อยแล้ว
    echo ไปที่ https://render.com เพื่อเริ่ม Deploy ได้ทันที!
    echo =========================================================
)

echo.
pause
