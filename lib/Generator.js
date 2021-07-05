class Generator {
    constructor (name,targetDir){
        // 目录名称
        this.name = name;
        // 目标路径
        this.targetDir = targetDir;
    }

    // 核心创建逻辑
    create(){
        console.log(`create ${this.name} in ${this.targetDir}`);
    }
}

module.exports = Generator;