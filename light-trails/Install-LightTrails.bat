@echo off
rem Light Trails auto-installer. Double-click to choose a version from a menu,
rem or pass one: Install-LightTrails.bat 2.1   (also: latest, list, uninstall)
setlocal
set "ARGS=-Version ask"
if /i "%~1"=="latest" set "ARGS=-Version latest"
if /i "%~1"=="list" set "ARGS=-List"
if /i "%~1"=="uninstall" set "ARGS=-Uninstall"
if not "%~1"=="" if /i not "%~1"=="latest" if /i not "%~1"=="list" if /i not "%~1"=="uninstall" set "ARGS=-Version %~1"
powershell -NoProfile -ExecutionPolicy Bypass -Command "$ErrorActionPreference='Stop'; [Net.ServicePointManager]::SecurityProtocol=[Net.SecurityProtocolType]::Tls12; $s=$null; foreach($r in 'HEAD','claude/pensive-ride-egnx10'){ try { $s=Invoke-RestMethod ('https://raw.githubusercontent.com/MohamedMabrook/Website/'+$r+'/light-trails/install.ps1'); break } catch {} }; if(-not $s){ Write-Host 'Could not reach GitHub.'; exit 1 }; & ([scriptblock]::Create($s)) %ARGS%"
echo.
pause
