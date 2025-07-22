const { contextBridge, ipcRenderer } = require('electron');

// 暴露受保护的API给渲染进程
contextBridge.exposeInMainWorld('electronAPI', {
    // 示例：发送消息到主进程
    sendMessage: (message) => ipcRenderer.send('message', message),

    // 示例：从主进程接收消息
    onMessage: (callback) => {
        ipcRenderer.on('message', (event, ...args) => callback(...args));
    },

    // 示例：调用主进程方法
    invoke: (channel, data) => {
        const validChannels = ['dialog:openFile', 'dialog:saveFile'];
        if (validChannels.includes(channel)) {
            return ipcRenderer.invoke(channel, data);
        }
    },

    // 获取应用版本
    getVersion: () => process.versions.electron,

    // 获取平台信息
    getPlatform: () => process.platform
});

// 移除所有监听器
window.addEventListener('beforeunload', () => {
    ipcRenderer.removeAllListeners();
}); 