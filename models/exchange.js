const mongoose = require('mongoose')

// DEFINE MODEL SCHEMA
const exchangeSchema = new mongoose.Schema({
   createdAt: {
      type: Date,
      default: Date.now
   },
   exchangeRate: {
      usd: String,
      eur: String
   },
   tag: Number
})

module.exports = mongoose.model('Exchange', exchangeSchema)