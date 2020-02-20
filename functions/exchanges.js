const axios = require('axios')
const config = require('../utils/config')

// EXCHANGE LINKS
// KRAKEN
// const krakenBtcEurLink = "https://api.cryptowat.ch/markets/kraken/btceur/price"
// BITSTAMP
// const bitstampBtcUsdLink = "https://api.cryptowat.ch/markets/bitstamp/btcusd/price"
// LUNO
// const lunoBtcLink = "https://api.mybitx.com/api/1/ticker?pair=XBTZAR"

// CONVERSION LINK
// USD/ZAR
// const usdZarConversionLink = "https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=ZAR&apikey=PUE3PZ1B5KZATT8E"
// EUR/ZAR
// const eurZarConversionLink = "https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=EUR&to_currency=ZAR&apikey=PUE3PZ1B5KZATT8E"


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
   const hour = t.getHours()
   
   // CONVERT DATE TO TIMESTAMP
   let timestamp = new Date(year, month, day, hour).getUnixTime()

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

const usdZarExchangeRate = async () => {
   const usdZarExchangeRate = await axios.get(config.USDZAR_LINK)

   const usdZarRate = parseFloat(usdZarExchangeRate.data['Realtime Currency Exchange Rate']['5. Exchange Rate']).toFixed(2)

   return usdZarRate
}

const eurZarExchangeRate = async () => {
   const eurZarExchangeRate = await axios.get(config.EURZAR_LINK)

   const eurZarRate = parseFloat(eurZarExchangeRate.data['Realtime Currency Exchange Rate']['5. Exchange Rate']).toFixed(2)

   return eurZarRate
}

module.exports = {
   getDateTimestamp,
   getKrakenPrice,
   getBitstampPrice,
   getLunoPrice,
   usdZarExchangeRate,
   eurZarExchangeRate
}