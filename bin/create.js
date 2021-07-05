const path = require('path');
const fs = require('fs-extra');

module.exports = async function(name,options){
    console.log('name:',name,'options:',options)
    //获取当前命令行执行地址
    const cwd = process.cwd();
    //创建的目录地址
    const targetAir = path.join(cwd,name);
    //判断目录是否存在
    if (fs.existsSync(targetAir)) {
        if (options.force) {
            await fs.remove(targetAir)
        }else{
            //TODO 询问用户是否覆盖
            console.log('询问用户是否覆盖');
        }
    }else{
        //TODO 直接创建目录
        console.log('直接创建');
    }
}