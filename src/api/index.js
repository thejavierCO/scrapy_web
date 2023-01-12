const express = require('express')
const path = require('path')
const morgan = require('morgan')

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', require('./routers'))

app.use('/', express.static(path.join(__dirname, '../../public')))

app.listen(process.env.PORT || 3000, () => console.log('run'))
