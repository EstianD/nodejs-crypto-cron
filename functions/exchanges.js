const axios = require('axios')
const config = require('../utils/config')
const Exchange = require('../models/exchange')

const getDateTimestamp = () => {
   Date.prototype.getUnixTime = function() { return this.getTime()/1000|0 };
   if(!Date.now) Date.now = function() { return new Date(); }
   Date.time = function() { return Date.now().getUnixTime(); }

   // DATE INSTANCE
   let t = new Date()
   
   // GET DATE VARIABLES
   const year = t.getFullYear()
   const month = t.getMonth() 
   const day = t.getDate()
   const hours = t.getHours()
   const minutes = t.getMinutes()
   const seconds = t.getSeconds()
   
   // CONVERT DATE TO TIMESTAMP
   let timestamp = new Date(year, month, day, hours, minutes, seconds).getUnixTime()

   return timestamp
}

const getKrakenPrice = async () => {
   const krakenPriceEUR = await axios.get(config.KRAKEN_URI)
   // console.log(krakenPriceEUR)

   const krakenPrice = krakenPriceEUR.data.result.price

   return krakenPrice
}

const getBitstampPrice = async () => {
   const bitstampPriceUSD = await axios.get(config.BITSTAMP_URI)

   const bitstampPrice = bitstampPriceUSD.data.result.price

   return bitstampPrice
}

const getLunoPrice = async () => {
   const lunoPriceZar = await axios.get(config.LUNO_URI)

   const lunoPrice = lunoPriceZar.data.bid

   return lunoPrice
}

const getExchangeRates = async () => {
   const exchange = await Exchange.findOne({ tag: 1 })
   
   return exchange.exchangeRate
}

module.exports = {
   getDateTimestamp,
   getKrakenPrice,
   getBitstampPrice,
   getLunoPrice,
   getExchangeRates
}