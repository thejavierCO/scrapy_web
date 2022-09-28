const config = require('./config')
const fs = require('fs')
const path = require('path')
const SADM = require('./page/sadm')
const CFE = require('./page/cfe')

async function Main(force = false) {
  // if (force) {
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

  // let linght = new CFE()
  // await linght.login(CFE.user, CFE.pass)
  // data.luz = await linght.getTableService()
  // linght.Exit()

  // fs.writeFileSync(path.join(__dirname, 'test.json'), JSON.stringify(data))
  return data
  // }
  // return fs.existsSync(path.join(__dirname, 'test.json'))
  //   ? JSON.parse(fs.readFileSync(path.join(__dirname, 'test.json')).toString())
  //   : Main(true)
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
