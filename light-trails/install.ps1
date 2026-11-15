<#
  Light Trails installer for DaVinci Resolve (Windows).

  Latest version:
    irm https://raw.githubusercontent.com/MohamedMabrook/Website/HEAD/light-trails/install.ps1 | iex

  A specific version, the list, or uninstall:
    & ([scriptblock]::Create((irm https://raw.githubusercontent.com/MohamedMabrook/Website/HEAD/light-trails/install.ps1))) -Version 2.0
    ... -List
    ... -Uninstall

  OpenFX versions go to C:\Program Files\Common Files\OFX\Plugins (asks for admin).
  The Fuse goes to %APPDATA%\Blackmagic Design\DaVinci Resolve\Support\Fusion\Fuses.
  Anything it replaces is backed up to %LOCALAPPDATA%\LightTrails\backup first.
#>
param(
    [string]$Version = "ask",
    [switch]$List,
    [switch]$Uninstall,
    [switch]$Elevated
)

$ErrorActionPreference = "Stop"
trap {
    Write-Host "Install failed: $_" -ForegroundColor Red
    if ($Elevated) { Read-Host "Press Enter to close" | Out-Null }
    break
}
[Net.ServicePointManager]::SecurityProtocol = [Net.ServicePointManager]::SecurityProtocol -bor [Net.SecurityProtocolType]::Tls12

$Repo    = "MohamedMabrook/Website"
$Refs    = @("HEAD", "claude/pensive-ride-egnx10")   # default branch first, then the working branch
$Common  = if ($env:CommonProgramW6432) { $env:CommonProgramW6432 } else { $env:CommonProgramFiles }   # 64-bit Common Files
$OfxDir  = Join-Path $Common "OFX\Plugins"
$Bundle  = Join-Path $OfxDir "LightTrails.ofx.bundle"
$FuseDir = Join-Path $env:APPDATA "Blackmagic Design\DaVinci Resolve\Support\Fusion\Fuses"
$Backup  = Join-Path $env:LOCALAPPDATA "LightTrails\backup"

function Get-RepoFile([string]$Path, [string]$OutFile) {
    foreach ($r in $Refs) {
        $url = "https://raw.githubusercontent.com/$Repo/$r/light-trails/$Path"
        try {
            if ($OutFile) { Invoke-WebRequest -UseBasicParsing -Uri $url -OutFile $OutFile; return $url }
            return (Invoke-WebRequest -UseBasicParsing -Uri $url).Content
        } catch { }
    }
    throw "Could not download light-trails/$Path from GitHub."
}

function Test-Admin {
    $id = [Security.Principal.WindowsIdentity]::GetCurrent()
    return (New-Object Security.Principal.WindowsPrincipal($id)).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
}

function Get-Installed {
    $v = @()
    $vf = Join-Path $Bundle "Contents\VERSION.txt"
    if (Test-Path $vf) { $v += "OpenFX " + (Get-Content $vf -Raw).Trim() }
    elseif (Test-Path $Bundle) { $v += "OpenFX (1.0 or unknown)" }
    if (Test-Path (Join-Path $FuseDir "LightTrails.fuse")) { $v += "Fuse" }
    if ($v.Count -eq 0) { return "nothing" }
    return ($v -join ", ")
}

function Wait-ResolveClosed {
    while (Get-Process -Name "Resolve" -ErrorAction SilentlyContinue) {
        Write-Host "DaVinci Resolve is running. Save your work, close it, then press Enter." -ForegroundColor Yellow
        [void](Read-Host)
    }
}

function Backup-Item([string]$Path) {
    if (-not (Test-Path $Path)) { return }
    $dest = Join-Path $Backup (Get-Date -Format "yyyyMMdd-HHmmss")
    New-Item -ItemType Directory -Force -Path $dest | Out-Null
    Copy-Item -Recurse -Force $Path $dest
    Write-Host "Backed up $(Split-Path $Path -Leaf) to $dest"
}

# Re-run the installer as administrator in a new window (works however this one was started).
function Invoke-Elevated([string[]]$ArgList) {
    $tmp = Join-Path $env:TEMP "LightTrails-install.ps1"
    [void](Get-RepoFile "install.ps1" $tmp)
    $all = @("-NoProfile", "-ExecutionPolicy", "Bypass", "-File", "`"$tmp`"", "-Elevated") + $ArgList
    try { Start-Process -FilePath "powershell.exe" -Verb RunAs -ArgumentList $all -Wait }
    catch { Write-Host "Administrator rights were declined; nothing was installed." -ForegroundColor Yellow }
}

# ---------------------------------------------------------------------------------------
$manifest = (Get-RepoFile "versions.json") | ConvertFrom-Json
$versions = @($manifest.versions)

Write-Host ""
Write-Host "Light Trails installer" -ForegroundColor Cyan
Write-Host "Installed now: $(Get-Installed)"
Write-Host ""

if ($List -or $Version -eq "ask") {
    for ($i = 0; $i -lt $versions.Count; $i++) {
        $v = $versions[$i]
        $tag = if ($v.recommended) { "  <- recommended" } else { "" }
        Write-Host ("  [{0}] {1,-5} {2,-6} {3}{4}" -f ($i + 1), $v.version, $v.kind, $v.title, $tag)
    }
    Write-Host "  [U] Uninstall"
    if ($List) { return }
    $ans = Read-Host "`nWhich one? (Enter = recommended)"
    if ($ans -match '^[Uu]$') { $Uninstall = $true }
    elseif ($ans -eq "") { $Version = "latest" }
    elseif ($ans -match '^\d+$' -and [int]$ans -ge 1 -and [int]$ans -le $versions.Count) { $Version = $versions[[int]$ans - 1].version }
    else { $Version = $ans }
}

if ($Uninstall) {
    if ((Test-Path $Bundle) -and -not (Test-Admin)) { Invoke-Elevated @("-Uninstall"); return }
    Wait-ResolveClosed
    Backup-Item $Bundle
    Backup-Item (Join-Path $FuseDir "LightTrails.fuse")
    Remove-Item -Recurse -Force $Bundle -ErrorAction SilentlyContinue
    Remove-Item -Force (Join-Path $FuseDir "LightTrails.fuse") -ErrorAction SilentlyContinue
    Write-Host "Light Trails removed." -ForegroundColor Green
    if ($Elevated) { Read-Host "Press Enter to close" | Out-Null }
    return
}

if ($Version -eq "latest") { $pick = $versions | Where-Object { $_.recommended } | Select-Object -First 1 }
else { $pick = $versions | Where-Object { $_.version -eq $Version } | Select-Object -First 1 }
if (-not $pick) { throw "No version '$Version'. Run with -List to see them." }

if ($pick.kind -eq "ofx" -and -not (Test-Admin)) {
    Write-Host "Installing an OpenFX plugin needs administrator rights; Windows will ask." -ForegroundColor Yellow
    Invoke-Elevated @("-Version", $pick.version)
    return
}

Write-Host "Installing Light Trails $($pick.version): $($pick.title)"
$work = Join-Path $env:TEMP ("LightTrails-" + [guid]::NewGuid().ToString("N"))
New-Item -ItemType Directory -Force -Path $work | Out-Null
try {
    $zip = Join-Path $work "pkg.zip"
    $src = Get-RepoFile $pick.file $zip
    Write-Host "Downloaded $src"
    Expand-Archive -Path $zip -DestinationPath $work -Force
    Wait-ResolveClosed

    if ($pick.kind -eq "ofx") {
        $b = Get-ChildItem -Path $work -Recurse -Directory -Filter "LightTrails.ofx.bundle" | Select-Object -First 1
        if (-not $b) { throw "Package has no LightTrails.ofx.bundle." }
        New-Item -ItemType Directory -Force -Path $OfxDir | Out-Null
        Backup-Item $Bundle
        Remove-Item -Recurse -Force $Bundle -ErrorAction SilentlyContinue
        Copy-Item -Recurse -Force $b.FullName $Bundle
        Set-Content -Path (Join-Path $Bundle "Contents\VERSION.txt") -Value $pick.version
        Write-Host "Installed to $Bundle" -ForegroundColor Green
        Write-Host "Open Resolve: Color page > Effects > OpenFX > Light Trails."
    } else {
        $f = Get-ChildItem -Path $work -Recurse -File -Filter "LightTrails.fuse" | Select-Object -First 1
        if (-not $f) { throw "Package has no LightTrails.fuse." }
        New-Item -ItemType Directory -Force -Path $FuseDir | Out-Null
        Backup-Item (Join-Path $FuseDir "LightTrails.fuse")
        Copy-Item -Force $f.FullName (Join-Path $FuseDir "LightTrails.fuse")
        Write-Host "Installed to $FuseDir" -ForegroundColor Green
        Write-Host "Open Resolve: Fusion page > Shift+Space > Light Trails."
    }
} finally {
    Remove-Item -Recurse -Force $work -ErrorAction SilentlyContinue
}
Write-Host ""
Write-Host "Problems? The plugin log is %TEMP%\LightTrails.log" -ForegroundColor DarkGray
if ($Elevated) { Read-Host "Press Enter to close" | Out-Null }
