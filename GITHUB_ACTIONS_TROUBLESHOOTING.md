# GitHub Actions 故障排除指南

## 🔧 常见问题及解决方案

### 1. 缺少 Tauri 脚本

**错误信息**:
```
npm error Missing script: "tauri"
```

**解决方案**:
- ✅ 已在 `package.json` 中添加 `"tauri": "tauri"` 脚本
- ✅ 在 GitHub Actions 中安装 Tauri CLI: `npm install -g @tauri-apps/cli`

### 2. 缺少 Tauri CLI

**错误信息**:
```
command not found: tauri
```

**解决方案**:
```yaml
- name: Install Tauri CLI
  run: npm install -g @tauri-apps/cli
```

### 3. Rust 工具链问题

**错误信息**:
```
error: toolchain 'stable' not found
```

**解决方案**:
```yaml
- name: Setup Rust
  uses: actions-rs/toolchain@v1
  with:
    toolchain: stable
    target: ${{ matrix.target }}
    override: true
```

### 4. 目标平台问题

**错误信息**:
```
error: could not find `std` for target `x86_64-pc-windows-msvc`
```

**解决方案**:
- ✅ 已在工作流中正确配置目标平台
- ✅ 使用 `actions-rs/toolchain@v1` 自动安装目标

### 5. Linux GTK 依赖问题

**错误信息**:
```
The system library `gobject-2.0` required by crate `gobject-sys` was not found.
```

**解决方案**:
```yaml
- name: Install dependencies (Linux)
  if: matrix.platform == 'ubuntu-latest'
  run: |
    sudo apt-get update
    sudo apt-get install -y libwebkit2gtk-4.0-dev \
      build-essential \
      curl \
      wget \
      libssl-dev \
      libgtk-3-dev \
      libayatana-appindicator3-dev \
      librsvg2-dev \
      libgirepository1.0-dev \
      libcairo2-dev \
      libpango1.0-dev \
      libatk1.0-dev \
      libgdk-pixbuf2.0-dev \
      libglib2.0-dev \
      libgobject-2.0-dev
```

## 📋 当前工作流配置

### 支持的平台
- **macOS**: `aarch64-apple-darwin`
- **Windows**: `x86_64-pc-windows-msvc`
- **Linux**: `x86_64-unknown-linux-gnu`

### 构建步骤
1. **检出代码**: `actions/checkout@v4`
2. **设置 Node.js**: `actions/setup-node@v4`
3. **设置 Rust**: `actions-rs/toolchain@v1`
4. **安装依赖**: `npm ci`
5. **安装 Tauri CLI**: `npm install -g @tauri-apps/cli`
6. **构建应用**: `npm run tauri:build`
7. **上传产物**: `actions/upload-artifact@v4`

## 🚀 本地测试

在推送代码之前，可以在本地测试构建：

```bash
# 测试 macOS 构建
npm run tauri:build:mac

# 测试开发模式
npm run tauri:dev
```

## 📦 构建产物

构建完成后，可以在 GitHub Actions 的 Artifacts 中下载：

- **macOS**: `.app` 和 `.dmg` 文件
- **Windows**: `.exe` 和 `.msi` 文件
- **Linux**: `.deb`、`.rpm` 和 `AppImage` 文件

## 🔍 调试技巧

### 查看构建日志
1. 在 GitHub 仓库页面点击 "Actions"
2. 选择失败的构建
3. 查看详细的错误日志

### 本地复现问题
```bash
# 安装 Tauri CLI
npm install -g @tauri-apps/cli

# 尝试构建
npm run tauri:build
```

### 检查环境
```bash
# 检查 Node.js 版本
node --version

# 检查 npm 版本
npm --version

# 检查 Rust 版本
rustc --version

# 检查 Tauri CLI
tauri --version
```

## 💡 最佳实践

1. **本地测试**: 在推送前先在本地测试构建
2. **依赖管理**: 使用 `npm ci` 而不是 `npm install`
3. **缓存优化**: 启用 npm 缓存加速构建
4. **错误处理**: 添加详细的错误信息和调试步骤

## 🎯 成功指标

✅ **构建成功**: 所有平台构建通过  
✅ **产物生成**: 生成可用的安装包  
✅ **自动化**: 推送代码后自动构建  
✅ **跨平台**: 支持 macOS、Windows、Linux  

---

现在你的 GitHub Actions 应该可以正常工作了！🎉 