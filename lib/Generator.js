const { getRepoList,getTagList } = require('./http'); //http请求
const inquirer = require('inquirer'); //询问模块
const ora = require('ora'); //loading模块
const util = require('util'); //util模块
const downloadGitRepo = require('download-git-repo'); //不支持promise
const path = require('path'); //path模块

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
        // downloadGitRepo模块promise化
        this.downloadGitRepo = util.promisify(downloadGitRepo);
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

    //获取模板的tag列表
    async getTag(repo){
        let tagList = await wrapLoading( getTagList,'waiting for tags',repo )
        if (!tagList) return;
        // 过滤我们需要的版本号
        const tags = tagList.map(item => item.name);
        // 用户选择
        const { tag } = await inquirer.prompt({
            name: 'tag',
            type: 'list',
            choices: tags,
            message: 'Please choose tag'
        })
        return tag
    }

    //下载模板代码
    async downloadTemplate(repo,tag){
        // download(repository, destination, options, callback)
        const requestUrl = `hwb-cli/${repo}${tag?'#'+tag:''}`;
        await wrapLoading(this.downloadGitRepo,'downloading',requestUrl,path.resolve(process.cwd(),this.targetDir))
    }

    // 核心创建逻辑
    async create(){
        const repo = await this.getRepo(); //获取到用户选择的模板名
        console.log('your select : ',repo);
        const tag = await this.getTag(repo); //获取到用户选择的版本号
        console.log('your select : ',tag);
        await this.downloadTemplate(repo,tag); //下载模板
    }
}

module.exports = Generator;