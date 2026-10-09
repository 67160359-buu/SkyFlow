@echo off
REM ==============================================================================
REM SkyFlow - Automated Windows Deployment Script
REM ==============================================================================

echo ======================================================
echo        Starting SkyFlow Deployment (Windows)
echo ======================================================

REM 1. Check Docker
echo.
echo [1/4] Checking Docker installation...
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Docker is not installed or not in PATH.
    pause
    exit /b 1
)

REM 2. Check .env
echo.
echo [2/4] Checking .env configuration...
if not exist .env (
    if exist .env.example (
        echo [INFO] Creating .env from .env.example...
        copy .env.example .env >nul
        echo [OK] .env created.
    )
) else (
    echo [OK] .env file found.
)

REM 3. Run Docker Compose
echo.
echo [3/4] Building and starting Docker containers...
docker compose up -d --build
if %errorlevel% neq 0 (
    echo [ERROR] Docker compose build failed.
    pause
    exit /b 1
)

REM 4. Health Check
echo.
echo [4/4] Verifying Deployment...
timeout /t 5 /nobreak >nul
curl -s http://localhost:3000/api/health
echo.
echo.
echo ======================================================
echo        SkyFlow Deployed Successfully!
echo ======================================================
echo Web Application: http://localhost:3000/flight.html
echo Auth Portal:     http://localhost:3000/index.html
echo Health Check:    http://localhost:3000/api/health
echo ======================================================
echo.
