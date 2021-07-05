const { getRepoList } = require('./http'); //http请求
const inquirer = require('inquirer'); //询问模块
const ora = require('ora'); //loading模块

//loading函数包裹请求
async function wrapLoading(fn,message,...args){
    //初始化ora
    const spinenr = ora(message);
    spinenr.start();
    try {
        const result = await fn(...args);
        spinenr.succeed();
        return result;
    } catch (error) {
        spinner.fail('Request failed, refetch ...');
    }
}

class Generator {
    constructor (name,targetDir){
        // 目录名称
        this.name = name;
        // 目标路径
        this.targetDir = targetDir;
    }

    //获取模板列表
    async getRepo(){
        let repoList = await wrapLoading( getRepoList,'waiting for template' )
        if (!repoList) return;
        // 过滤我们需要的模板名称
        const repos = repoList.map(item => item.name);
        // 用户选择
        const { repo } = await inquirer.prompt({
            name: 'repo',
            type: 'list',
            choices: repos,
            message: 'Please choose a template to create project'
        })
        return repo
    }

    // 核心创建逻辑
    async create(){
        const repo = await this.getRepo(); //获取到用户选择的模板名
        console.log('your select : ',repo);
    }
}

module.exports = Generator;