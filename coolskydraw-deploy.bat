@echo off
chcp 65001 >nul
setlocal

REM ============================================================
REM  Coolskydraw 一键打包脚本
REM  功能：构建 Web 静态文件 + 打包成 Windows .exe 安装包
REM  用法：双击本脚本，或在项目根目录命令行执行
REM  产物：coolskydraw-app\dist\Coolskydraw Setup 1.0.0.exe
REM ============================================================

echo.
echo ==========================================
echo    Coolskydraw 一键打包工具
echo ==========================================
echo.

REM ---------- 切换到脚本所在目录（项目根目录） ----------
cd /d "%~dp0"

REM ---------- [1/5] 检查环境 ----------
echo [1/5] 检查环境...
where node >nul 2>nul
if errorlevel 1 (
    echo [错误] 未检测到 Node.js，请先安装 Node.js 18 或更高版本
    echo        下载地址: https://nodejs.org/
    goto :fail
)
where yarn >nul 2>nul
if errorlevel 1 (
    echo [错误] 未检测到 yarn，请先安装 yarn
    echo        安装命令: npm install -g yarn
    goto :fail
)
echo        环境就绪

REM ---------- [2/5] 设置镜像加速 ----------
echo [2/5] 设置镜像加速...
set "ELECTRON_MIRROR=https://npmmirror.com/mirrors/electron/"
set "ELECTRON_BUILDER_BINARIES_MIRROR=https://npmmirror.com/mirrors/electron-builder-binaries/"
echo        已启用 npmmirror 镜像（加速 Electron 下载）

REM ---------- [3/5] 安装依赖 ----------
echo [3/5] 检查并安装依赖...
call yarn install --non-interactive
if errorlevel 1 (
    echo [错误] 依赖安装失败
    goto :fail
)
echo        依赖就绪

REM ---------- [4/5] 构建 Web ----------
echo [4/5] 构建 Web 静态文件...
call yarn --cwd coolskydraw-app build
if errorlevel 1 (
    echo [错误] Web 构建失败
    goto :fail
)
echo        Web 构建完成

REM ---------- [5/5] 打包 exe ----------
echo [5/5] 打包 Windows .exe 安装包...
call yarn --cwd coolskydraw-app electron:dist
if errorlevel 1 (
    echo [错误] 打包失败
    goto :fail
)

echo.
echo ==========================================
echo    打包成功！
echo.
echo    安装包位置:
echo    coolskydraw-app\dist\Coolskydraw Setup 1.0.0.exe
echo.
echo    免安装绿色版:
echo    coolskydraw-app\dist\win-unpacked\Coolskydraw.exe
echo ==========================================
echo.
pause
exit /b 0

:fail
echo.
echo ==========================================
echo    打包失败，请检查上方错误信息
echo ==========================================
echo.
pause
exit /b 1
