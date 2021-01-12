const fs = require('fs-extra')
const path = require('path')
const inquirer = require('inquirer')
const Creator = require('../lib/Creator')
/**
 * 
 * @param {项目名称} projectName 
 * @param {参数选项} options
 */
module.exports = async function(projectName, options) {
  const cwd = process.cwd()
  const projectPath = path.join(cwd, projectName)
  if (fs.existsSync(projectPath)) {
    if (options.force) {
      await fs.remove(projectPath)
    } else {
      const { action } = await inquirer.prompt([
        {
          name: 'action',
          type: 'list',
          message: 'Target directory already exists Pick an action',
          choices: [
            {
              name: 'Overwrite',
              value: 'overwrite'
            },
            {
              name: 'Cancel',
              value: false
            }
          ]
        }
      ])
      if (!action) {
        return
      }

      if (action === 'overwrite') {
        console.log('\r\nRemoving...')
        await fs.remove(projectPath)
      }
    }
  }

  // 创建项目
  const creator = new Creator(projectName, projectPath)
  creator.create()
}
