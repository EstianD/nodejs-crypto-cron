const http = require('http')
const app = require('./app')
const config = require('./utils/config')
const cron = require('node-cron')
const server = http.createServer(app)

// CRON
const runCron = require('./functions/crypto_cron')

cron.schedule("1 * * * *", () => {
  runCron()
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})