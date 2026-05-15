@echo off
setlocal

cd /d "%~dp0"
set "HOST=127.0.1.1"
set "PORT=12701"

echo Serving "%CD%" at http://%HOST%:%PORT%/
python -m http.server %PORT% --bind %HOST%

