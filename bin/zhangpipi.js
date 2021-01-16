#!/usr/bin/env node
// console.log('zhangpipi-cli')
const program = require('commander')  //引入命令模块
program.version(require('../package.json').version)//指定版本号为package中的版本，可以直接填写

program
    .command('init <name>')//指令名称
    .description('init project')//指令描述
    // .action(name=>{//指令动作
    //     console.log('init   '+name)
    // })
    .action(require('../lib/init'))

program
    .command('refresh')//指令名称
    .description('refresh router and menu')//指令描述
    // .action(name=>{//指令动作
    //     console.log('init   '+name)
    // })
    // .action(()=>{
    //     console.log('action')
    // })
    .action(require('../lib/refresh'))
program.parse(process.argv)//主进程参数   必写



