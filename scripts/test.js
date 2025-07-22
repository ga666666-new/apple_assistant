const fs = require('fs');
const path = require('path');

console.log('🧪 开始测试 Apple Assistant...');

// 测试配置
const tests = [
    {
        name: '检查 package.json',
        test: () => fs.existsSync('package.json'),
        description: 'package.json 文件存在'
    },
    {
        name: '检查主进程文件',
        test: () => fs.existsSync('electron/main.js'),
        description: 'electron/main.js 文件存在'
    },
    {
        name: '检查预加载脚本',
        test: () => fs.existsSync('electron/preload.js'),
        description: 'electron/preload.js 文件存在'
    },
    {
        name: '检查 Web 应用',
        test: () => fs.existsSync('dist/index.html'),
        description: 'dist/index.html 文件存在'
    },
    {
        name: '检查 GitHub Actions',
        test: () => fs.existsSync('.github/workflows/build.yml'),
        description: 'GitHub Actions 工作流文件存在'
    },
    {
        name: '检查构建脚本',
        test: () => fs.existsSync('build-all.sh'),
        description: 'build-all.sh 脚本存在'
    }
];

// 运行测试
let passedTests = 0;
let totalTests = tests.length;

console.log('\n📋 运行测试...\n');

tests.forEach((test, index) => {
    try {
        const result = test.test();
        if (result) {
            console.log(`✅ ${index + 1}. ${test.name}: ${test.description}`);
            passedTests++;
        } else {
            console.log(`❌ ${index + 1}. ${test.name}: ${test.description}`);
        }
    } catch (error) {
        console.log(`❌ ${index + 1}. ${test.name}: 测试失败 - ${error.message}`);
    }
});

// 显示结果
console.log('\n📊 测试结果:');
console.log(`   通过: ${passedTests}/${totalTests}`);
console.log(`   失败: ${totalTests - passedTests}/${totalTests}`);

if (passedTests === totalTests) {
    console.log('\n🎉 所有测试通过！');
    console.log('✅ 项目结构正确');
    console.log('✅ 可以开始开发或构建');
    process.exit(0);
} else {
    console.log('\n❌ 部分测试失败！');
    console.log('💡 请检查失败的项目');
    process.exit(1);
} 