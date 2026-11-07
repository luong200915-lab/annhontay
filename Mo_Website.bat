@echo off
chcp 65001 > nul
echo ======================================================
echo    KHỞI ĐỘNG WEBSITE ĐỊA ĐẠO CỦ CHI / AN NHƠN TÂY
echo ======================================================
cd /d "%~dp0"
echo [1/2] Đang mở trình duyệt web...
timeout /t 2 /nobreak > nul
start "" "http://localhost:3000"
echo [2/2] Đang chạy server...
npm run dev
pause
