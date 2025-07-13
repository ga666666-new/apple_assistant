# 🚀 构建策略说明

## 📋 可用的构建工作流

### 1. 完整构建 (`build.yml`)
**支持平台**: macOS、Windows、Linux  
**用途**: 构建所有平台的版本

**特点**:
- ✅ 支持所有主要平台
- ✅ 包含 Linux GTK 依赖安装
- ⚠️ 构建时间较长
- ⚠️ Linux 构建可能遇到依赖问题

### 2. 简化构建 (`build-simple.yml`)
**支持平台**: macOS、Windows  
**用途**: 快速构建主要平台版本

**特点**:
- ✅ 构建速度快
- ✅ 稳定性高
- ✅ 覆盖主要用户群体
- ❌ 不包含 Linux 版本

## 🎯 推荐策略

### 开发阶段
使用 **简化构建** (`build-simple.yml`)：
- 快速验证功能
- 减少构建时间
- 专注于主要平台

### 发布阶段
使用 **完整构建** (`build.yml`)：
- 支持所有平台
- 完整的用户覆盖
- 专业发布

## 🔧 平台特定配置

### macOS
- **目标**: `aarch64-apple-darwin`
- **构建时间**: ~5-10 分钟
- **产物**: `.app` 和 `.dmg` 文件
- **依赖**: 系统自带，无需额外安装

### Windows
- **目标**: `x86_64-pc-windows-msvc`
- **构建时间**: ~10-15 分钟
- **产物**: `.exe` 和 `.msi` 文件
- **依赖**: Visual Studio Build Tools

### Linux
- **目标**: `x86_64-unknown-linux-gnu`
- **构建时间**: ~15-20 分钟
- **产物**: `.deb`、`.rpm`、`AppImage` 文件
- **依赖**: GTK 开发库（已配置自动安装）

## 📦 构建产物

### macOS 构建产物
```
src-tauri/target/aarch64-apple-darwin/release/bundle/
├── macos/
│   └── Apple Assistant.app
└── dmg/
    └── Apple Assistant_0.1.0_aarch64.dmg
```

### Windows 构建产物
```
src-tauri/target/x86_64-pc-windows-msvc/release/bundle/
├── msi/
│   └── Apple Assistant_0.1.0_x64_en-US.msi
└── msi/
    └── Apple Assistant_0.1.0_x64_en-US.msi
```

### Linux 构建产物
```
src-tauri/target/x86_64-unknown-linux-gnu/release/bundle/
├── deb/
│   └── apple-assistant_0.1.0_amd64.deb
├── rpm/
│   └── apple-assistant-0.1.0.x86_64.rpm
└── appimage/
    └── Apple Assistant_0.1.0_x86_64.AppImage
```

## 🚀 使用方法

### 手动触发构建
1. 在 GitHub 仓库页面点击 "Actions"
2. 选择工作流（`build.yml` 或 `build-simple.yml`）
3. 点击 "Run workflow"
4. 选择分支并运行

### 自动触发构建
- **推送代码**: 自动触发构建
- **Pull Request**: 自动触发构建
- **定时构建**: 可配置定时任务

## 💡 优化建议

### 1. 缓存优化
```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '18'
    cache: 'npm'  # 启用 npm 缓存
```

### 2. 并行构建
- 使用矩阵策略并行构建多个平台
- 减少总体构建时间

### 3. 条件构建
- 根据文件变更选择构建策略
- 避免不必要的构建

## 🔍 故障排除

### 常见问题
1. **Linux GTK 依赖**: 已配置自动安装
2. **Windows 链接器**: 使用 Windows 环境
3. **macOS 签名**: 可配置代码签名

### 调试步骤
1. 查看构建日志
2. 检查依赖安装
3. 验证环境配置

## 🎯 成功指标

✅ **构建成功**: 所有目标平台构建通过  
✅ **产物完整**: 生成所有预期的安装包  
✅ **自动化**: 推送代码后自动构建  
✅ **稳定性**: 构建过程稳定可靠  

---

选择合适的构建策略，让你的应用快速到达用户手中！🎉 