const config = require('../config')
const SADM = require('../page/sadm')
const router = require('express').Router()

router.get('/', async (req, res, next) => {
  try {
    let data = {}
    let wheater = new SADM()
    await wheater.login(config.SADM.user, config.SADM.pass)
    data = await wheater.getTableService()
    wheater.Exit()
    res.json(data)
  } catch (err) {
    res.json({ err: err.message })
  }
})

module.exports = router
