# Apple Assistant

这是一个使用 Tauri 将 Web 应用打包成跨平台桌面应用的项目。

## 项目结构

```
Apple Assistant/
├── dist/                   # 前端构建产物（HTML、CSS、JS）
│   ├── index.html
│   └── static/
├── src-tauri/             # Tauri 后端代码
│   ├── src/
│   │   └── main.rs
│   ├── Cargo.toml
│   ├── tauri.conf.json
│   └── build.rs
└── package.json
```

## 安装依赖

### 1. 安装 Rust
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

### 2. 安装 Tauri CLI
```bash
npm install -g @tauri-apps/cli
# 或者
cargo install tauri-cli
```

### 3. 安装项目依赖
```bash
npm install
```

## 开发

### 开发模式（热重载）
```bash
npm run tauri:dev
```

### 构建生产版本
```bash
npm run tauri:build
```

构建完成后，可执行文件将在 `src-tauri/target/release/bundle/` 目录中。

## 支持的平台

- **Windows**: `.exe` 安装包和便携版
- **macOS**: `.dmg` 安装包和 `.app` 应用
- **Linux**: `.deb`、`.rpm` 包和 `AppImage`

## 功能特性

- ✅ 跨平台支持（Windows、macOS、Linux）
- ✅ 原生性能
- ✅ 小体积（相比 Electron）
- ✅ 安全性（Rust 后端）
- ✅ 现代 Web 技术支持
- ✅ 系统托盘支持
- ✅ 自动更新支持

## 配置说明

主要配置文件位于 `src-tauri/tauri.conf.json`，你可以在这里修改：

- 窗口大小和属性
- 应用图标
- 权限设置
- 构建目标
- 应用元数据

## 图标

请将应用图标放在 `src-tauri/icons/` 目录中，支持以下格式：
- `32x32.png`
- `128x128.png`
- `128x128@2x.png`
- `icon.icns` (macOS)
- `icon.ico` (Windows) 