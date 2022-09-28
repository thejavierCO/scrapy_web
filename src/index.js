const config = require('./config')
const SADM = require('./page/sadm')

async function Main() {
  let wheater = new SADM()
  await wheater.login(config.SADM.user, config.SADM.pass)
  let data = await wheater
    .getTableService()
    .then((e) =>
      e.map((e) => {
        const { id, direction, date, price } = e
        return {
          id,
          street: direction,
          date,
          price,
        }
      }),
    )
    .then((e) => {
      e.map(async (e) => {
        const { data, error } = await config.supabase.from('agua').insert(e)
        if (error) {
          let { code } = error
          if (code == 23505) {
            const { data, error } = await config.supabase.from('agua').update(e)
            if (error) throw error
            return data
          } else throw error
        }
        return data
      })
    })
  wheater.Exit()
  return data
}

Main()
  .then((e) => {
    console.log('update')
    return true
  })
  .then((e) => {
    setInterval(async () => {
      await Main()
    }, 86400)
  })
  .catch((err) => {
    console.log(err, 'message')
  })
