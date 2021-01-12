const util = require('util')
const path = require('path')
const inquirer = require('inquirer')
const download = require('download-git-repo')
const chalk = require('chalk')
const { wrapLoading } = require('./utils')
const {
  fetchRequestList,
  fetchTagList
} = require('./request')

class Creator {
  constructor(targetName, targetPath) {
    this.name = targetName
    this.target = targetPath
    this.downloadRepo = util.promisify(download)
  }

  async fetchRepo() {
    const repos = await wrapLoading(fetchRequestList, 'waiting fetch template', '')
    if (!repos) return
    const repoNames = repos.map(repo => repo.name)
    const { repoName } = await inquirer.prompt([
      {
        name: 'repoName',
        type: 'list',
        choices: repoNames,
        message: 'please choose a template to create project'
      }
    ])
    return repoName
  }

  async fetchTag(repo) {
    const tags = await wrapLoading(fetchTagList, 'waiting fetch tag', '', repo)
    if (!tags) return
    const tagNames = tags.map(tag => tag.name)
    const { tag } = await inquirer.prompt([
      {
        name: 'tag',
        type: 'list',
        choices: tagNames,
        message: 'please choose a tag to create project'
      }
    ])
    return tag
  }

  // 拉取模板
  async download(repo, tag) {
    const repoUrl = `zhu-cli/${repo}${tag ? '#' + tag : ''}`
    const result = await wrapLoading(this.downloadRepo, 'pull project template...', 'init project success', repoUrl, path.resolve(process.cwd(), `${repo}@${tag}`)) 
    return result
  }

  async create() {
    console.log(this.name, this.target)
    // 拉取仓库列表
    const repo = await this.fetchRepo()
    // 拉取仓库tag
    const tag = await this.fetchTag(repo)
    // 下载模板
    const result = await this.download(repo, tag, this.target)
    if (!result) {
      console.log(chalk.cyan('happy coding!'))
    }
  }
}

module.exports = Creator
