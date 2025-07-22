#!/bin/bash

# Apple Assistant - 全平台构建脚本
# 使用 Electron 构建跨平台桌面应用

set -e

echo "🚀 开始构建 Apple Assistant..."

# 检查 Node.js 版本
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ 错误: 需要 Node.js 18.x 或更高版本"
    echo "当前版本: $(node --version)"
    exit 1
fi

echo "✅ Node.js 版本检查通过: $(node --version)"

# 安装依赖
echo "📦 安装依赖..."
npm ci

# 清理之前的构建
echo "🧹 清理之前的构建..."
rm -rf release/

# 构建所有平台
echo "🔨 构建所有平台..."

# macOS
echo "🍎 构建 macOS 版本..."
npm run build:mac

# Windows
echo "🪟 构建 Windows 版本..."
npm run build:win

# Linux
echo "🐧 构建 Linux 版本..."
npm run build:linux

echo "✅ 构建完成！"

# 显示构建结果
echo ""
echo "📁 构建产物:"
ls -la release/

echo ""
echo "🎉 所有平台构建完成！"
echo "📦 构建产物位于 release/ 目录" 