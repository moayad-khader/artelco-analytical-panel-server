import { FastifyListenOptions } from 'fastify'
import { app } from './apis'

import messages from './messages'



app.addContentTypeParser(
  'application/json',
  { parseAs: 'string' },
  function (req, body, done) {
    try {
      if (typeof body === 'string') var newBody = JSON.parse(body)
      done(null, newBody)
    } catch (error) {
      error.statusCode = 400
      done(error, undefined)
    }
  },
)

app.setNotFoundHandler(function (req, reply) {
  reply
    .code(404)
    .send({ error: 'Not Found', message: messages.NOT_FOUND, statusCode: 404 })
})

const start = async () => {
  await app.ready()

  try {
    const PORT = process.env.port || process.env.PORT || 5003
    const listenerOpts: FastifyListenOptions = {
      port: +PORT,
      host: '0.0.0.0',
    }
    app.listen(listenerOpts, (err, address) => {
      if (err) {
        console.error(err)
        process.exit(1)
      }
      console.log(`\
        🚀🚀🚀🚀🚀🚀🚀 Server ready at: http://localhost:${PORT}/api 🔥🔥🔥🔥🔥🔥🔥`)
    })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

;(async () => {
  await start()
})()
