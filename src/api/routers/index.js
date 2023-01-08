const router = require('express').Router()

router.use('/agua', require('./sadm'))
router.use('/luz', require('./cfe'))

router.get('/', async (req, res, next) => {
  res.json({ status: false })
})

module.exports = router
