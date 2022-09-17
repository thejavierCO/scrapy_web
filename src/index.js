require('dotenv').config()

const CFE = require('./page/cfe')

async function Main() {
  let test = new CFE(true)
  await test.login(process.env.CFE_EMAIL, process.env.CFE_PASS)
  let data = await test.getTableService()
  console.log(data)
  // test.Exit()
}

Main()
