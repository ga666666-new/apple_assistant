# Apple Assistant

这是一个使用 Electron 将 Web 应用打包成跨平台桌面应用的项目。

## 项目结构

```
Apple Assistant/
├── dist/                   # 前端构建产物（HTML、CSS、JS）
│   ├── index.html
│   └── static/
├── electron/              # Electron 主进程代码
│   ├── main.js           # 主进程入口文件
│   ├── preload.js        # 预加载脚本
│   └── icons/            # 应用图标
├── scripts/              # 构建和开发脚本
│   └── dev.js           # 开发环境启动脚本
├── .github/workflows/    # GitHub Actions 工作流
│   └── build.yml        # 自动构建和发布配置
└── package.json
```

## 安装依赖

### 1. 安装 Node.js
确保你的系统已安装 Node.js 18.x 或更高版本。

### 2. 安装项目依赖
```bash
npm install
```

## 开发

### 开发模式（热重载）
```bash
npm run dev
```

### 直接启动 Electron
```bash
npm start
```

### 构建生产版本
```bash
npm run build
```

构建完成后，可执行文件将在 `release/` 目录中。

## 支持的平台

- **Windows**: `.exe` 安装包和便携版
- **macOS**: `.dmg` 安装包和 `.zip` 压缩包
- **Linux**: `.AppImage`、`.deb` 包

## 功能特性

- ✅ 跨平台支持（Windows、macOS、Linux）
- ✅ 现代 Web 技术支持
- ✅ 原生菜单和快捷键
- ✅ 系统托盘支持
- ✅ 自动更新支持
- ✅ GitHub Actions 自动构建
- ✅ 安全的主进程和渲染进程隔离

## 配置说明

主要配置文件位于 `package.json` 的 `build` 字段，你可以在这里修改：

- 窗口大小和属性
- 应用图标
- 构建目标
- 应用元数据

## 图标

请将应用图标放在 `electron/icons/` 目录中，支持以下格式：
- `icon.png` (Linux)
- `icon.icns` (macOS)
- `icon.ico` (Windows)

## GitHub Actions

项目配置了自动构建和发布流程：

1. 当推送带有 `v*` 标签的提交时，会自动触发构建
2. 构建完成后会自动创建 GitHub Release
3. 支持 Windows、macOS 和 Linux 三个平台

### 发布新版本

```bash
# 创建新版本标签
git tag v1.0.0
git push origin v1.0.0
```

## 开发注意事项

- 主进程代码位于 `electron/main.js`
- 预加载脚本位于 `electron/preload.js`
- 渲染进程使用 `dist/` 目录中的 Web 应用
- 开发时可以通过 `window.electronAPI` 访问主进程功能 