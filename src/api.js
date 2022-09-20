const express = require('express')
const Main = require('./index')
const app = express()
const morgan = require('morgan')

app.use(morgan('dev'))

app.get('/update', async (req, res, next) => {
  await Main(true)
  res.json({ ok: 'updated' })
})

app.get('/data', async (req, res, next) => {
  res.json(await Main())
})

app.listen(process.env.PORT || 3000, () => console.log('run'))
