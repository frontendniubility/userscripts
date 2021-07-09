const { p, stringIncludesAny, entries, logger } = require('./../../webpack.common')

let b = Promise.resolve()

let i = 60
function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}
while (i--) {
  
  let c = i
  logger.warn(`add task , the i is ${c}`)
  b = b.then(data => {
    logger.warn(`get the Data ${data} , the i is ${c}`)
    return new Promise(resolve => {
      logger.warn(`start the ${c} task`)
      setTimeout(() => {
        logger.warn(`runing the ${c} task`)
        resolve(c)
      }, 1000)
    })
  })
}
