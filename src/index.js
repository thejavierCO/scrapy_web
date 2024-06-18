const config = require('./config')
const SADM = require('./scrapyweb/page/sadm')
const CFE = require('./scrapyweb/page/cfe')

async function Main() {
  let cfe = new CFE(),
    wheater = new SADM()
  let dataluz = await cfe
    .login(config.CFE.user, config.CFE.pass)
    .then((_) => cfe.getTableService())
    .then((e) =>
      e
        .map(({ street, data }) => ({
          id: parseInt(data['Número de servicio'].replace(/ /g, '')),
          street,
          date: data['Fecha límite de pago'],
          price:
            data['Estado del recibo'] != 'PAGADO'
              ? parseInt(data['Monto a pagar por el período'].slice(1))
              : 0,
        }))
    )
    .catch((e) => {
      console.log(e)
      throw e
    })
  cfe.Exit()

  let dataagua = await wheater
    .login(config.SADM.user, config.SADM.pass)
    .then(async (e) => await wheater.getTableService())
    .then((e) =>
      e
        .map((e) => {
          const { id, direction, date, price } = e
          return {
            id,
            street: direction,
            date,
            price,
          }
        }),
    )
    .catch((e) => {
      console.log(e)
      throw e
    })
  wheater.Exit()
  return { agua: dataagua, luz: dataluz }
}

function loop() {
  return Main().then((a) => console.log('update', a))
}
loop();
// loop()
//   .then(() => {
//     let clear = setInterval(
//       () =>
//         loop().catch((e) => {
//           console.log(e)
//           clearInterval(clear)
//         }),
//       Math.round(86400),
//     )
//   })
//   .catch((e) => {
//     console.log(e)
//   })
