@echo off
echo Starting ParkEase...
start cmd /k "cd server && node server.js"
start cmd /k "cd client && npm start"
echo Both servers are starting in separate windows.
pause
