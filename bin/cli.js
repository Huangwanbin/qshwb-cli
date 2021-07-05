#!/usr/bin/env node
const program = require('commander');

program // 定义命令和参数
    .command('create <app-name>')
    .description('create a new project')
    // -f or --force 为强制创建，如果创建的目录存在则直接覆盖,用户输入 qs create <my-project> -f 则在action中的options为{force: true}
    .option('-f, --force', 'overwrite target directory if it exist')
    .action((name,options)=>{
        require('./create.js')(name,options) //处理用户交互函数
    })

program // 配置版本号信息和帮助信息的首行提示
  .version(`v${require('../package.json').version}`)
  .usage('<command> [option]')
  
// 解析用户执行命令传入参数
program.parse(process.argv);