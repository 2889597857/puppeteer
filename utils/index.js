const getTopURL = url => url.replace(/^https?:\/\/(.*?)(:\d+)?\/.*$/, '$1')

async function executeAsyncTask (taskList, fn) {
  const INIT = 0
  const MAX = taskList.length
  const CONCURRENCY = 3
  let cnt = INIT
  let promises = []

  for (let i = 0; i < CONCURRENCY; i++) {
    let p = new Promise(resolve => {
      ;(async function loop (index) {
        if (index < MAX) {
          await fn(taskList[index])
          loop(cnt++)
          return
        }
        resolve()
      })(cnt++)
    })
    promises.push(p)
  }
  await Promise.all(promises)
}

module.exports = { getTopURL, executeAsyncTask }
