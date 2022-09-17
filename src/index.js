require('dotenv').config()
const fs = require('fs')
const path = require('path')
const SADM = require('./page/sadm')

async function Main() {
  let test = new SADM()
  await test.login(process.env.SADM_EMAIL, process.env.SADM_PASS)
  let data = await test.getTableService()
  test.Exit()
  fs.writeFileSync(path.join(__dirname, 'test.json'), JSON.stringify(data))
}
Main()
