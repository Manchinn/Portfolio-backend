@echo off
chcp 65001 >nul
REM ==================================================
REM Portfolio Backend - API Testing Script (Windows)
REM ==================================================
REM Usage: test-api.bat
REM ==================================================

setlocal enabledelayedexpansion

set BASE_URL=http://localhost:3000/api
set FRONTEND_URL=http://localhost:5173

echo.
echo ==============================================================
echo =   Portfolio Backend API Testing (Windows)                  =
echo =   Server: %BASE_URL%
echo =   Frontend: %FRONTEND_URL%
echo ==============================================================
echo.

REM Function to print test header
echo.
echo ----------------------------------------------------
echo Testing: Health Check
echo ----------------------------------------------------
curl -s %BASE_URL%/health
echo.
echo.

echo ----------------------------------------------------
echo Testing: GET /api/profile
echo ----------------------------------------------------
curl -s %BASE_URL%/profile
echo.
echo.

echo ----------------------------------------------------
echo Testing: GET /api/skills
echo ----------------------------------------------------
curl -s %BASE_URL%/skills
echo.
echo.

echo ----------------------------------------------------
echo Testing: GET /api/experiences
echo ----------------------------------------------------
curl -s %BASE_URL%/experiences
echo.
echo.

echo ----------------------------------------------------
echo Testing: GET /api/projects
echo ----------------------------------------------------
curl -s %BASE_URL%/projects
echo.
echo.

echo ----------------------------------------------------
echo Testing: GET /api/projects/1
echo ----------------------------------------------------
curl -s %BASE_URL%/projects/1
echo.
echo.

echo ----------------------------------------------------
echo Testing: GET /api/socials
echo ----------------------------------------------------
curl -s %BASE_URL%/socials
echo.
echo.

echo ----------------------------------------------------
echo Testing: POST /api/contact (Valid Data)
echo ----------------------------------------------------
curl -X POST %BASE_URL%/contact ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"message\":\"Test message from API testing script!\"}"
echo.
echo.

echo ==============================================================
echo Testing Complete!
echo --------------------------------------------------------------
echo Next Steps:
echo 1. Verify all endpoints return success: true
echo 2. Check data structure matches frontend expectations
echo 3. Start frontend dev server: npm run dev
echo 4. Update frontend .env with VITE_USE_API=true
echo ==============================================================
echo.

pause
