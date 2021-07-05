const path = require('path');   //路径处理模块
const fs = require('fs-extra'); //文件处理模块
const inquirer = require('inquirer');   //询问模块

module.exports = async function(name,options){
    //获取当前命令行执行地址
    const cwd = process.cwd();
    //创建的目录地址
    const targetAir = path.join(cwd,name);
    //判断目录是否存在
    if (fs.existsSync(targetAir)) {
        //用户明确强制创建
        if (options.force) {
            await fs.remove(targetAir)
        //用户没明确强制创建
        }else{
            //询问用户是否覆盖
            let { overwriteSelect } = await inquirer.prompt({
                name: 'overwriteSelect',
                type: 'list',
                message: 'Do you want to overwrite ?',
                choices: [
                    {
                        name: 'overwrite',
                        value: true
                    },
                    {
                        name: 'cancel',
                        value: false
                    }
                ]
            });
            //用户选择不覆盖
            if (!overwriteSelect) {
                //cancel
                return;
            //用户选择覆盖
            }else{
                //overwrite
                console.log('overwrite doing~');
                await fs.remove(targetAir)
                //创建目录

            }
        }
    }else{
        //TODO 直接创建目录
        console.log('直接创建');
    }
}