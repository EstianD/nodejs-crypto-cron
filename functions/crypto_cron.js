const axios = require('axios')
const Crypto = require('../models/crypto')
const dateFormat = require('dateformat');
const customFunction = require('./exchanges')

// GET BTC:USD VALUE
const runCron = async () => {

   // DATE FUNCTION
   const timestamp = customFunction.getDateTimestamp()

   // KRAKEN PRICE
   const krakenPrice = await customFunction.getKrakenPrice()
   
   // BITSTAMP PRICE
   const bitstampPrice = await customFunction.getBitstampPrice()
   
   // LUNO PRICE
   const lunoPriceZar = await customFunction.getLunoPrice()

   // USD/ZAR CONVERSION RATE
   // const usdZarExchangeRate = await customFunction.usdZarExchangeRate()

   // EUR/ZAR CONVERSION RATE
   // const eurZarExchangeRate = await customFunction.eurZarExchangeRate()

   const exchangeRates = await customFunction.getExchangeRates()

   // console.log(exchangeRates)

   const trade = new Crypto({
      timestamp: timestamp,
      exchangeRate: {
         "usd": exchangeRates.usd,
         "eur": exchangeRates.eur
      },
      luno: {
         price: lunoPriceZar,
         symbol: "zar"
      },
      kraken: {
         price: krakenPrice,
         symbol: "eur"
      },
      bitstamp: {
         price: bitstampPrice,
         symbol: "usd"
      }
   })

   const savedTrade = await trade.save()

   // console.log(savedTrade.toJSON())
}

module.exports = runCron