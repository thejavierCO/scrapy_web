require('dotenv').config()
const fs = require('fs')
const path = require('path')
const SADM = require('./page/sadm')
const CFE = require('./page/cfe')

async function Main() {
  let test = new CFE()
  await test.login(process.env.CFE_EMAIL, process.env.CFE_PASS)
  let data = await test.getTableService()
  test.Exit()
  fs.writeFileSync(path.join(__dirname, 'test.json'), JSON.stringify(data))
}
Main()
