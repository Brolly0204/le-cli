# cli

## 安装
```sh
npm install
```

## 使用 
```shell
#创建全局软连接
npm link

#创建项目
lee-cli create <project> [options]
```

### option
目前仅支持 -f/--force --help

## 必备模块
先从大家众所周知的vue-cli入手,看看用了哪些npm包来实现的

- commander ：参数解析 --help其实就借助了他~

- inquirer ：交互式命令行工具，有他就可以实现命令行的选择功能

- download-git-repo ：在git中下载模板

- chalk ：粉笔帮我们在控制台中画出各种各样的颜色

- metalsmith ：读取所有文件,实现模板渲染

- consolidate ：统一模板引擎
