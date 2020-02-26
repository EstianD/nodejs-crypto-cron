require('dotenv').config()

let PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI
let KRAKEN_URI = process.env.KRAKENBTCEURLINK
let BITSTAMP_URI = process.env.BITSTAMPBTCUSDLINK
let LUNO_URI = process.env.LUNOBTCZARLINK


if(process.env.NODE_ENV === "test"){
   MONGODB_URI = process.env.TEST_MONGODB_URI
}

module.exports = {
   MONGODB_URI,
   PORT,
   KRAKEN_URI,
   BITSTAMP_URI,
   LUNO_URI
}