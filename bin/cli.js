#!/usr/bin/env node
const program  = require('commander')
const chalk = require('chalk')
const {
  name,
  version
} = require('../package.json')

program.version(`${name}@${version}`)
.usage('<command> [option]')

const formatArgs = (cmd) => {
  const args = {}
  cmd.options.forEach(o => {
    const key = o.long.slice(2)
    if (cmd[key]) args[key] = cmd[key]
  })
  return args
}
program.command('create <app-name>')
.description('create a new project')
.option('-f, --force', 'overwrite target directory if it exists')
.option('-t, --track', 'track path')
.action((name, cmd) => {
  const args = formatArgs(cmd)
  require('../lib/create.js')(name, args)
})

program.command('config [value]')
.description('inspect and modify the config')
.option('-g, --get <path>', 'get value from option')
.option('-s, --set <path> <value>', 'set value from option')
.option('-d, --delete <path>', 'delete value from option')
.action((value, cmd) => {
  console.log(value, formatArgs(cmd))
})

program.on('--help', () => {
  console.log()
  console.log(`Run ${chalk.cyan('lee-cli <command> --help')} show details`)
  console.log()
})

// 注意在最后必须要执行解析命令参数这一行
program.parse(process.argv)
