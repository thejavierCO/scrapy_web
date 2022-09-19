require('dotenv').config()
const fs = require('fs')
const path = require('path')
const SADM = require('./page/sadm')
const CFE = require('./page/cfe')
const Naturagy = require('./page/naturagy')

async function Main() {
  let data = {}

  let wheater = new SADM()
  await wheater.login(process.env.SADM_EMAIL, process.env.SADM_PASS)
  data.agua = await wheater.getTableService()
  wheater.Exit()

  let linght = new CFE()
  await linght.login(process.env.CFE_EMAIL, process.env.CFE_PASS)
  data.luz = await linght.getTableService()
  linght.Exit()

  fs.writeFileSync(path.join(__dirname, 'test.json'), JSON.stringify(data))
}
Main()
