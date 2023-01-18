const express = require('express')
const path = require('path')
const app = express()
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5000

app.use(express.json())

app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/root'))

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})
mongoose.connection.on('error', err => {
  console.log(err)
  logEvents(`${err.no}\t${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log")
})