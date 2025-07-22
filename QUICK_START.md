# Apple Assistant - 快速开始指南

## 🚀 快速开始

### 1. 克隆项目
```bash
git clone <your-repo-url>
cd Apple-Assistant
```

### 2. 安装依赖
```bash
npm install
```

### 3. 开发模式
```bash
npm run dev
```

### 4. 构建应用
```bash
npm run build
```

## 📦 构建选项

### 构建所有平台
```bash
npm run build:all
```

### 构建特定平台
```bash
# macOS
npm run build:mac

# Windows
npm run build:win

# Linux
npm run build:linux
```

## 🔧 开发工具

### 直接启动 Electron
```bash
npm start
```

### 打包应用（不创建安装包）
```bash
npm run pack
```

## 📱 支持的平台

- ✅ **macOS**: `.dmg` 安装包，`.zip` 压缩包
- ✅ **Windows**: `.exe` 安装包，便携版
- ✅ **Linux**: `.AppImage`，`.deb` 包

## 🏗️ 项目结构

```
Apple Assistant/
├── dist/              # Web 应用构建产物
├── electron/          # Electron 主进程
│   ├── main.js       # 主进程入口
│   ├── preload.js    # 预加载脚本
│   └── icons/        # 应用图标
├── scripts/          # 构建脚本
├── .github/          # GitHub Actions
└── package.json      # 项目配置
```

## 🔄 GitHub Actions

项目配置了自动构建和发布：

1. **触发条件**: 推送 `v*` 标签
2. **构建平台**: Windows, macOS, Linux
3. **自动发布**: 创建 GitHub Release

### 发布新版本
```bash
git tag v1.0.0
git push origin v1.0.0
```

## 🛠️ 开发注意事项

### 主进程和渲染进程通信
```javascript
// 在渲染进程中
window.electronAPI.sendMessage('Hello from renderer');

// 在预加载脚本中定义 API
contextBridge.exposeInMainWorld('electronAPI', {
  sendMessage: (message) => ipcRenderer.send('message', message)
});
```

### 安全配置
- `nodeIntegration: false` - 禁用 Node.js 集成
- `contextIsolation: true` - 启用上下文隔离
- `webSecurity: true` - 启用 Web 安全

## 📋 常用命令

| 命令 | 描述 |
|------|------|
| `npm run dev` | 开发模式启动 |
| `npm start` | 直接启动 Electron |
| `npm run build` | 构建生产版本 |
| `npm run build:all` | 构建所有平台 |
| `npm run pack` | 打包应用 |

## 🐛 故障排除

### 常见问题

1. **构建失败**
   - 检查 Node.js 版本（需要 18.x+）
   - 清理 `node_modules` 重新安装

2. **图标不显示**
   - 确保图标文件存在于 `electron/icons/` 目录
   - 检查图标文件格式和大小

3. **权限问题**
   - macOS: 在系统偏好设置中允许应用运行
   - Windows: 以管理员身份运行

## 📚 相关资源

- [Electron 官方文档](https://www.electronjs.org/docs)
- [electron-builder 文档](https://www.electron.build/)
- [GitHub Actions 文档](https://docs.github.com/en/actions) 