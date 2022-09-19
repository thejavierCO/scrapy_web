require('dotenv').config()
const fs = require('fs')
const path = require('path')
const SADM = require('./page/sadm')
const CFE = require('./page/cfe')
const Naturagy = require('./page/naturagy')

async function Main() {
  let test = new Naturagy(true)
  await test.login(process.env.NATURAGY_EMAIL, process.env.NATURAGY_PASS)
  let data = await test.getDataService()
  console.log(data)
  // test.Exit()
  // fs.writeFileSync(path.join(__dirname, 'test.json'), JSON.stringify(data))
}
Main()
