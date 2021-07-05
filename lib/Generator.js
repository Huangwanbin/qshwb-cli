const { getRepoList } = require('./http');
const inquirer = require('inquirer');
class Generator {
    constructor (name,targetDir){
        // 目录名称
        this.name = name;
        // 目标路径
        this.targetDir = targetDir;
    }

    //获取模板列表
    async getRepo(){
        let repoList = await getRepoList()
        if (!repoList) return;
        // 过滤我们需要的模板名称
        const repos = repoList.map(item => item.name);
        console.log(repos);
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
        console.log(`create ${this.name} in ${this.targetDir}`);
        const repo = await this.getRepo()
        console.log('select',repo);
    }
}

module.exports = Generator;