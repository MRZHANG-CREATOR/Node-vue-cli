//欢迎界面
const { promisify } = require('util')//打印欢迎界面是一个异步回调的过程，用promisify进行封装
const figlet = promisify(require('figlet'))//本身是一个回调方法，用promisify加工   大文字
const clear = require('clear')//清屏命令
const chalk = require('chalk')//打印装饰彩色
const log = content => {//自定义打印函数
    console.log(chalk.green(content))//打印成绿色的
}
const { clone } = require('./download')
const open = require('open')
const mspawn = async (...args) => {//自定义spawn
    const { spawn } = require('child_process')//导入原生spawn
    return new Promise(resolve => {
        // @ts-ignore
        const proc = spawn(...args)//子进程
        //子进程有两个流，开始插水管
        // @ts-ignore
        proc.stdout.pipe(process.stdout)//正常流 对接   process就是当前进程
        // @ts-ignore
        proc.stderr.pipe(process.stderr)//错误流 对接
        proc.on('close', () => {//执行完了
            resolve()
        })
    })
}
module.exports = async name => {
    try {
        //打印欢迎界面
        clear()//清屏
        const data = await figlet('Z h a n g p i p i      w e l c o m e')//大文字
        log(data)//打印

        // clone
        console.log('')
        log(`开始创建项目 : ${name}`)
        await clone('github:MRZHANG-CREATOR/Vue2-basic-cli', name)//从GitHub克隆项目到name文件夹 默认是master分支
        log('创建成功')

        //自动安装依赖
        log('安装依赖中,约100MB,请等待···')
        await mspawn('npm.cmd', ['install'], { cwd: `./${name}` })   // cwd 指定目录   注意点npm.cmd
        log(chalk.green(`
        安装完成：
        To get Start:
        ===========================
        cd ${name}
        npm run serve
        ===========================
        `))

        //启动浏览器
        setTimeout(() => {
            open('http://localhost:8080')
            console.log(chalk.red('启动浏览器'))
        }, 5000)
        console.log("")
        console.log(chalk.green('^_^ 5s后启动浏览器,开始启动项目······'))

        //自动启动
        await mspawn('npm.cmd', ['run', 'serve'], { cwd: `./${name}` })//指定目录下 npm run serve     注意点npm.cmd


    } catch (err) {
        console.log(err)
        return
    }
}
