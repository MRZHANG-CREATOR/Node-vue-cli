//克隆
const {promisify}=require('util')//克隆是一个异步回调的过程，用promisify进行封装
module.exports.clone=async function (repo,desc){
    const download=promisify(require('download-git-repo'))//从GitHub上下载东西
    const ora=require('ora')//引入转啊转进度条
    const process=ora(`下载中...${repo}`)//定义进度条
    process.start()//进度条开转
    await download(repo,desc)//开始下载
    process.succeed()//成功

}