const { spawn } = require('child_process');
const path = require('path');

// 设置开发环境变量
process.env.NODE_ENV = 'development';

// 启动前端开发服务器（如果有的话）
// 这里假设你有一个前端开发服务器在端口3000运行
console.log('🚀 启动开发环境...');

// 启动Electron应用
const electronProcess = spawn('electron', ['.'], {
    stdio: 'inherit',
    shell: true
});

electronProcess.on('close', (code) => {
    console.log(`Electron进程退出，退出码: ${code}`);
    process.exit(code);
});

electronProcess.on('error', (err) => {
    console.error('启动Electron时出错:', err);
    process.exit(1);
});

// 处理进程退出
process.on('SIGINT', () => {
    console.log('\n🛑 正在关闭开发环境...');
    electronProcess.kill('SIGINT');
});

process.on('SIGTERM', () => {
    console.log('\n🛑 正在关闭开发环境...');
    electronProcess.kill('SIGTERM');
}); 