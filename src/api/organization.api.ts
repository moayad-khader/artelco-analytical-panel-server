import {
    createHandler,
    updateHandler,
    getOneHandler,
  } from '../handlers/organization.handler'
  import {
    createSchema,
    updateSchema,
    getOneSchema,
  } from '../schemas/organization.schema'
  import {
    createBody,
    updateBody,
  } from '../request.types/organization.body.types'
  import {
    getOne,
  } from '../request.types/organization.query.types'
  import { FastifyInstance } from 'fastify'
  import { checkAuthorization } from '../utils/user.utils'
  import Routes from '../routes'
  
  export default (fastify: FastifyInstance, opts, done) => {
    fastify.post<{ Body: createBody }>(Routes.organization, {
      preValidation: checkAuthorization,
      schema: createSchema,
      handler: createHandler,
    })
  
    fastify.patch<{ Body: updateBody }>(Routes.organization, {
      preValidation: checkAuthorization,
      schema: updateSchema,
      handler: updateHandler,
    })
  
    fastify.get<{ Querystring: getOne }>(Routes.organization_single, {
      preValidation: checkAuthorization,
      schema: getOneSchema,
      handler: getOneHandler,
    })
  
    done()
  }
  