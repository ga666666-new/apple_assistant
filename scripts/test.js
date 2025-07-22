const { app, BrowserWindow } = require('electron');
const path = require('path');

// 测试配置
const TEST_TIMEOUT = 5000; // 5秒超时

let mainWindow;
let testResults = {
    windowCreated: false,
    windowLoaded: false,
    appReady: false
};

function createTestWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            webSecurity: true
        }
    });

    testResults.windowCreated = true;
    console.log('✅ 窗口创建成功');

    // 加载测试页面
    const testUrl = `file://${path.join(__dirname, '../dist/index.html')}`;
    mainWindow.loadURL(testUrl);

    mainWindow.webContents.on('did-finish-load', () => {
        testResults.windowLoaded = true;
        console.log('✅ 页面加载成功');

        // 检查页面内容
        mainWindow.webContents.executeJavaScript(`
      document.title === 'Apple Assistant' ? 'PASS' : 'FAIL'
    `).then(result => {
            if (result === 'PASS') {
                console.log('✅ 页面标题正确');
            } else {
                console.log('❌ 页面标题不正确');
            }
        }).catch(err => {
            console.log('❌ 页面内容检查失败:', err.message);
        });
    });

    mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
        console.log('❌ 页面加载失败:', errorDescription);
    });

    // 5秒后关闭应用
    setTimeout(() => {
        console.log('\n📋 测试结果:');
        console.log(`  窗口创建: ${testResults.windowCreated ? '✅' : '❌'}`);
        console.log(`  页面加载: ${testResults.windowLoaded ? '✅' : '❌'}`);
        console.log(`  应用就绪: ${testResults.appReady ? '✅' : '❌'}`);

        if (testResults.windowCreated && testResults.windowLoaded) {
            console.log('\n🎉 所有测试通过！');
            process.exit(0);
        } else {
            console.log('\n❌ 部分测试失败！');
            process.exit(1);
        }
    }, TEST_TIMEOUT);
}

app.whenReady().then(() => {
    testResults.appReady = true;
    console.log('✅ 应用就绪');
    createTestWindow();
}).catch(err => {
    console.log('❌ 应用启动失败:', err.message);
    process.exit(1);
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createTestWindow();
    }
});

// 处理未捕获的异常
process.on('uncaughtException', (error) => {
    console.log('❌ 未捕获的异常:', error.message);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.log('❌ 未处理的 Promise 拒绝:', reason);
    process.exit(1);
}); 