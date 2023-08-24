import Fastify from 'fastify'
import constants from '../constants'
import UserAPI from './user.api'
import OrganizationApi from './organization.api'
import BillboardApi from './billboard.api'
import ChartApi from './chart.api'
import TabularApi from './tabular.api'

export const app = Fastify({ logger: true })

app.register(require('@fastify/swagger'), {
    swagger: {
      info: {
        title: 'My Fastify API',
        description: 'Documentation for my Fastify API',
        version: '1.0.0',
      },
      securityDefinitions: {
        bearerAuth: {
            type: 'apiKey',
            name: 'Authorization', // This is the name of the header that will be used for the Bearer token
            in: 'header',
            scheme: 'bearer', // Specify the scheme as 'bearer' for Bearer token
          },
      },
      security: [
        {
          bearerAuth: [], // This indicates that the "bearerAuth" security is required for all routes
        },
    ],
    },
    exposeRoute: true, 
   
  });
  
app.register(require('@fastify/swagger-ui'), {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false
  },
  uiHooks: {
    onRequest: function (request, reply, next) { next() },
    preHandler: function (request, reply, next) { next() }
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
  transformSpecificationClone: true
})

app.register(UserAPI, { prefix: constants.API_PREFIX })
app.register(OrganizationApi, { prefix: constants.API_PREFIX })
app.register(BillboardApi, { prefix: constants.API_PREFIX })
app.register(ChartApi, { prefix: constants.API_PREFIX })
app.register(TabularApi, { prefix: constants.API_PREFIX })