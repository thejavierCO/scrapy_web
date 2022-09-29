const config = require('./config')
const CFE = require('./scrapyweb/page/cfe')
const supabse = require('./supabase')

async function Main() {
  let wheater = new CFE()
  let data = await wheater
    .login(config.CFE.user, config.CFE.pass)
    .then((_) => wheater.getTableService())
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
        .map(async (e) => {
          try {
            let { error } = await supabse.from('luz').insert(e)
            if (error)
              if (error.code == 23505) {
                let { error } = await supabse.from('luz').update(e)
                if (error) throw error
              } else throw error
          } catch (err) {
            console.log(err)
          }
        }),
    )
    .catch((e) => {
      console.log(e)
    })
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
