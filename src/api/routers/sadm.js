const supabase = require('../supabase')
const router = require('express').Router()

router.get('/', async (req, res, next) => {
  try {
    let { data, error } = await supabase.form('agua').select('*')
    if (error) throw error
    res.json(data)
  } catch (err) {
    res.json({ err: err.message })
  }
})

module.exports = router
