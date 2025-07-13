# Windows 构建调试指南

## 🔍 问题分析

根据错误信息，Windows 构建失败的主要原因是：
1. **没有生成 bundle 文件** - `src-tauri/target/x86_64-pc-windows-msvc/release/bundle/` 目录不存在
2. **PowerShell 命令错误** - 使用了 Linux 命令 `ls -la` 而不是 Windows 命令

## 🛠️ 已修复的问题

### 1. 修复了 GitHub Actions 工作流
- ✅ 添加了详细的构建诊断步骤
- ✅ 修复了 PowerShell 命令兼容性
- ✅ 添加了环境信息检查
- ✅ 改进了错误处理

### 2. 优化了 Tauri 配置
- ✅ 将 `targets: "all"` 改为明确的 `["app", "updater"]`
- ✅ 添加了 `if-no-files-found: warn` 参数

## 🚀 解决方案

### 方案 1: 使用改进的工作流
现在的工作流包含详细的诊断信息，会显示：
- 环境信息（Node、Rust、Tauri CLI 版本）
- dist 目录内容
- Tauri 配置文件
- 构建输出详情

### 方案 2: 使用专用 Windows 工作流
创建了 `build-windows.yml` 专门用于 Windows 构建调试。

### 方案 3: 本地 Windows 构建
如果 GitHub Actions 持续失败，建议：
1. 在 Windows 机器上安装 Visual Studio Build Tools
2. 运行 `npm run tauri:build:windows`

## 📋 常见问题排查

### 1. Bundle 目录不存在
**原因**: Tauri 构建过程中没有生成安装包
**解决**: 
- 检查 `dist` 目录是否存在且包含 `index.html`
- 确认 Tauri 配置正确
- 查看构建日志中的错误信息

### 2. PowerShell 命令错误
**原因**: 使用了 Linux 命令
**解决**: 已修复为使用 Windows 兼容命令

### 3. 依赖问题
**原因**: 缺少 Windows 构建工具
**解决**: GitHub Actions 会自动安装所需依赖

## 🔧 手动调试步骤

如果问题持续存在，可以：

1. **检查构建日志**:
   ```bash
   # 查看详细的构建输出
   npm run tauri:build -- --verbose
   ```

2. **验证配置**:
   ```bash
   # 检查 Tauri 配置
   tauri info
   ```

3. **清理并重新构建**:
   ```bash
   # 清理之前的构建
   cargo clean
   npm run tauri:build
   ```

## 📁 文件位置说明

构建成功后，文件应该位于：
- **Windows**: `src-tauri/target/x86_64-pc-windows-msvc/release/bundle/`
- **macOS**: `src-tauri/target/aarch64-apple-darwin/release/bundle/`
- **Linux**: `src-tauri/target/x86_64-unknown-linux-gnu/release/bundle/`

## 🎯 下一步

1. 推送代码到 GitHub 触发新的构建
2. 查看 Actions 页面中的详细日志
3. 如果仍有问题，使用 `build-windows.yml` 进行专门调试
4. 根据日志信息进一步优化配置

## 📞 获取帮助

如果问题仍然存在，请：
1. 分享完整的 GitHub Actions 日志
2. 提供 `tauri info` 的输出
3. 检查是否有特定的错误信息 