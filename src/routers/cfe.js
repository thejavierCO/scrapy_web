const config = require('../config')
const CFE = require('../page/cfe')
const router = require('express').Router()

router.get('/', async (req, res, next) => {
  let data = {}
  let luz = new CFE()
  await luz.login(config.CFE.user, config.CFE.pass)
  data = await luz.getTableService()
  luz.Exit()
  res.json(data)
})

module.exports = router
