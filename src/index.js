require('dotenv').config()
const SADM = require('./page/sadm')

async function Main() {
  let test = new SADM()
  await test.login(process.env.SADM_EMAIL, process.env.SADM_PASS)
  let data = await test.getTableService()
  test.Exit()
  console.log(data)
}
Main()
