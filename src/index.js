const config = require('./config')
const SADM = require('./scrapyweb/page/sadm')

async function Main() {
  let wheater = new SADM()
  await wheater.login(config.SADM.user, config.SADM.pass)
  let data = await wheater.getTableService().then((e) =>
    e.map(({ id, direction, date, price }) => ({
      id,
      street: direction,
      date,
      price,
    })),
  )
  wheater.Exit()
  return data
}

Main()
  .then((e) => {
    console.log(e)
  })
  .catch((err) => {
    console.log(err, 'message')
  })
