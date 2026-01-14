@echo off
set PORT=8000
echo Serving on http://localhost:%PORT% (Ctrl+C to stop)
python -m http.server %PORT%
