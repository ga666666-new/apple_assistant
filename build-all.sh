#!/bin/bash

# 设置环境变量
export PATH="$HOME/.cargo/bin:$PATH"

echo "🚀 开始跨平台构建 Apple Assistant..."

# 构建 macOS 版本
echo "📱 构建 macOS 版本..."
npm run tauri:build:mac
if [ $? -eq 0 ]; then
    echo "✅ macOS 构建成功！"
else
    echo "❌ macOS 构建失败！"
    exit 1
fi

# 构建 Windows 版本（使用 Cross）
echo "🪟 构建 Windows 版本..."
echo "⚠️  注意：Windows 构建需要 Docker 环境"
echo "💡 建议：使用 GitHub Actions 进行跨平台构建"

cd src-tauri
if command -v cross &> /dev/null; then
    cross build --target x86_64-pc-windows-msvc --release
    if [ $? -eq 0 ]; then
        echo "✅ Windows 构建成功！"
    else
        echo "❌ Windows 构建失败！"
        echo "💡 提示：请确保 Docker 已安装并运行"
    fi
else
    echo "❌ Cross 工具未安装"
    echo "💡 安装命令：cargo install cross"
fi
cd ..

echo "🎉 构建完成！"
echo ""
echo "📦 构建产物位置："
echo "  macOS: src-tauri/target/aarch64-apple-darwin/release/bundle/"
echo "  Windows: src-tauri/target/x86_64-pc-windows-msvc/release/bundle/" 