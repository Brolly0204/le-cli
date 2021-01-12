const ora = require('ora')
const chalk = require('chalk')

async function sleep(n) {
  return new Promise((resolve, reject) => setTimeout(resolve, n))
}

const wrapLoading = async (fn, message, successMes, ...other) => {
  const spinner = ora(message)
  spinner.start()
  try {
    const repos = await fn(...other)
    spinner.succeed(chalk.cyan(successMes))
    return repos
  } catch(e) {
    spinner.fail('request failed, refetch...')
    await sleep(1000)
    return wrapLoading(fn, message, ...other) 
  }
}

module.exports = {
  sleep,
  wrapLoading
}
