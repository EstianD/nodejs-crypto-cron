const mongoose = require('mongoose')
const config = require('./utils/config')
const cors = require('cors')
const bodyParser = require('body-parser')
const express = require('express')

const app = express()

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true,
useUnifiedTopology: true })
   .then(() => {
      console.log('connected to MongoDB')
   })
   .catch((error) => {
      console.log('error connecting to MongoDB', error.message)
   })

app.use(cors())
app.use(bodyParser.json())

module.exports = app
