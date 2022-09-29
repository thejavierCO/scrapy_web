const config = require('./config')
const CFE = require('./scrapyweb/page/cfe')

async function Main() {
  let wheater = new CFE()
  await wheater.login(config.CFE.user, config.CFE.pass)
  let data = await wheater.getTableService().then((e) =>
    e.map(({ street, data }) => ({
      id: parseInt(data['Número de servicio'].replace(/ /g, '')),
      street,
      date: data['Fecha límite de pago'],
      price:
        data['Estado del recibo'] == 'PAGADO'
          ? parseInt(data['Monto a pagar por el período'].slice(1))
          : 0,
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
