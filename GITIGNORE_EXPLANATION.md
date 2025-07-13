# .gitignore 文件说明

## 📁 被忽略的文件和目录

### 🔧 依赖文件
- `node_modules/` - npm 依赖包
- `npm-debug.log*` - npm 调试日志
- `yarn-debug.log*` - yarn 调试日志
- `pnpm-debug.log*` - pnpm 调试日志

### 🦀 Rust 相关
- `target/` - Rust 编译输出目录
- `Cargo.lock` - Rust 依赖锁定文件
- `src-tauri/target/` - Tauri 编译输出
- `src-tauri/Cargo.lock` - Tauri 依赖锁定文件

### 📦 构建输出
- `dist/` - 前端构建输出
- `build/` - 构建输出目录
- `out/` - 输出目录

### 🔐 环境变量
- `.env*` - 环境变量文件

### 💻 IDE 和编辑器
- `.vscode/` - VS Code 配置
- `.idea/` - IntelliJ IDEA 配置
- `*.swp`, `*.swo` - Vim 临时文件

### 🖥️ 操作系统
- `.DS_Store` - macOS 系统文件
- `Thumbs.db` - Windows 缩略图文件
- `*~` - Linux 临时文件

### 📝 日志文件
- `logs/` - 日志目录
- `*.log` - 日志文件

### 🗂️ 临时文件
- `tmp/` - 临时目录
- `temp/` - 临时目录

### 🎯 构建产物
- `*.dmg` - macOS 安装包
- `*.app` - macOS 应用包
- `*.exe` - Windows 可执行文件
- `*.msi` - Windows 安装包
- `*.deb` - Linux Debian 包
- `*.rpm` - Linux RPM 包
- `*.AppImage` - Linux AppImage

## ✅ 被保留的重要文件

### 📋 配置文件
- `package.json` - npm 配置
- `src-tauri/Cargo.toml` - Rust 配置
- `src-tauri/tauri.conf.json` - Tauri 配置
- `src-tauri/build.rs` - 构建脚本

### 📁 源代码
- `src-tauri/src/` - Rust 源代码
- `src-tauri/icons/` - 应用图标

### 📚 文档
- `README.md` - 项目说明
- `PROJECT_SUMMARY.md` - 项目总结
- `QUICK_START.md` - 快速开始
- `WINDOWS_BUILD_SOLUTIONS.md` - Windows 构建方案

### 🔄 CI/CD
- `.github/` - GitHub Actions 配置

## 🎯 设计原则

1. **排除构建产物**: 只保留源代码和配置文件
2. **排除依赖**: 不提交 `node_modules` 和 `target` 目录
3. **排除系统文件**: 忽略操作系统生成的文件
4. **排除临时文件**: 忽略日志、缓存等临时文件
5. **保留必要配置**: 确保项目可以在其他机器上正常构建

## 💡 使用建议

1. **首次克隆**: 运行 `npm install` 安装依赖
2. **构建项目**: 运行 `npm run tauri:build:mac` 生成应用
3. **开发模式**: 运行 `npm run tauri:dev` 启动开发服务器

## 🔍 验证 .gitignore

```bash
# 查看被忽略的文件
git status --ignored

# 查看将被提交的文件
git status

# 查看所有文件（包括被忽略的）
git status --ignored --porcelain
```

这样配置确保了仓库只包含必要的源代码和配置文件，保持仓库的整洁和高效！🎉 