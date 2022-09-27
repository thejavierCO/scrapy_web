const config = require('./config')
const fs = require('fs')
const path = require('path')
const SADM = require('./page/sadm')
const CFE = require('./page/cfe')

async function Main(force = false) {
  if (force) {
    let data = {}

    let wheater = new SADM()
    await wheater.login(config.SADM.user, config.SADM.pass)
    data.agua = await wheater.getTableService()
    wheater.Exit()

    let linght = new CFE()
    await linght.login(config.CFE.user, config.CFE.pass)
    data.luz = await linght.getTableService()
    linght.Exit()

    fs.writeFileSync(path.join(__dirname, 'test.json'), JSON.stringify(data))
    return data
  }
  return fs.existsSync(path.join(__dirname, 'test.json'))
    ? JSON.parse(fs.readFileSync(path.join(__dirname, 'test.json')).toString())
    : Main(true)
}

Main()
  .then((e) => {
    console.log('update')
    return true
  })
  .then((e) => {
    setInterval(async () => {
      await Main()
    }, 86400)
  })
  .catch((err) => {
    console.log(err, 'message')
  })
