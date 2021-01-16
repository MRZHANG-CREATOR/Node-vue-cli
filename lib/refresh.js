//约定路由
const fs = require('fs')
const handlebars = require('handlebars')
const chalk = require('chalk')
module.exports = async () => {
    //获取列表
    //读取views文件夹有几个文件
    const list = fs.readdirSync('./src/views')
        .filter(v =>  v !== 'Home.vue' )   //注意点： .filter(v =>  {v !== 'Home.vue'} )错误
        .map(v => ({
            name: v.replace('.vue', '').toLowerCase(),
            file: v
        }))
        console.log(list)
        
    //生成路由定义              嵌套，权限？？
    compile({ list }, './src/router/index.js', './template/router.js.hbs')

    //生成菜单
    compile({ list }, './src/App.vue', './template/App.vue.hbs')

    /**
     * 模板编译函数
     * @param {*} meta 数据定义
     * @param {*} filePath 目标文件
     * @param {*} templatePath 模板文件
     */
    function compile(meta, filePath, templatePath) {
        //判断模板是否存在
        if (fs.existsSync(templatePath)) {
            const content = fs.readFileSync(templatePath).toString()//同步读取模板，二进制转字符串
            // const template= handlebars.compile(content)
            // const result=template(meta)
            const result = handlebars.compile(content)(meta)//颗粒化函数，工厂函数，返回一个新的函数
            fs.writeFileSync(filePath, result)//写入
            console.log(chalk.green('🚀' + filePath + '创建成功'))//打印日志
            // console.log(chalk.green(` 🚀 ${filePath} 创建成功 `))//打印日志
        } else {
            return console.log('模板不存在')
        }
    }
}