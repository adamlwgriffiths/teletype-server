async function startServer () {
  process.on('unhandledRejection', (reason) => {
    console.error(reason.stack)
  })

  require('dotenv').config()
  const Server = require('./lib/server')
  const server = new Server({
    databaseURL: process.env.DATABASE_URL,
    pusherAppId: process.env.PUSHER_APP_ID,
    pusherKey: process.env.PUSHER_KEY,
    pusherSecret: process.env.PUSHER_SECRET,
    twilioAccount: process.env.TWILIO_ACCOUNT,
    twilioAuthToken: process.env.TWILIO_AUTH_TOKEN,
    port: process.env.PORT || 3000
  })
  await server.start()
  return server
}

async function startTestServer (params) {
  const TestServer = require('./lib/test-server')
  const server = new TestServer(params)
  await server.start()
  return server
}

module.exports = {startServer, startTestServer}
