import cors from '@fastify/cors'
import { app } from './api/'
import { dbConnector } from './data-source'
import envVars from './vars'


//SECTION In case global middlewares & Hooks config

// AppDataSource.initialize().then(async () => {
//   console.log("DB conn success");
// }).catch(error => console.log(error));

app.register(require('@fastify/cookie'))
app.register(require('@fastify/csrf-protection'))

app.register(dbConnector)




app.register(cors, {
  origin: ['http://localhost:3000'],
})

// app.register(require('@fastify/secure-session'), {
//   // the name of the session cookie, defaults to 'session'
//   cookieName: 'my-session-cookie',
//   // adapt this to point to the directory where secret-key is located
//   key: Buffer.from(envVars.COOKIE_SECRET, 'utf-8'), // envVars.COOKIE_SECRET,
//   cookie: {
//     path: '/',
//     // options for setCookie, see https://github.com/fastify/fastify-cookie
//   },
// })




export { app }
