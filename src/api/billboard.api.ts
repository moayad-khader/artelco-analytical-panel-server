import {
  createHandler,
  updateHandler,
  getOneHandler,
  getAllHandler
} from '../handlers/billboard.handler'
import {
  createSchema,
  updateSchema,
  getOneSchema,
  getAllSchema
} from '../schemas/billboard.schema'
import { createBody, updateBody } from '../request.types/billboard.body.types'
import { FastifyInstance } from 'fastify'
import { checkAuthorization } from '../utils/user.utils'
import Routes from '../routes'
import { getAll, getOne } from '@artelco/request.types/billboard.query.types'

export default (fastify: FastifyInstance, opts, done) => {
  fastify.post<{ Body: createBody }>(Routes.billboard, {
    // preValidation: checkAuthorization,
    schema: createSchema,
    handler: createHandler,
  })

  fastify.patch<{ Body: updateBody }>(Routes.billboard, {
    // preValidation: checkAuthorization,
    schema: updateSchema,
    handler: updateHandler,
  })

  fastify.get<{ Querystring: getOne }>(Routes.billboard_single, {
    // preValidation: checkAuthorization,
    schema: getOneSchema,
    handler: getOneHandler,
  })

  fastify.get<{ Querystring: getAll }>(Routes.billboard, {
    // preValidation: checkAuthorization,
    schema: getAllSchema,
    handler: getAllHandler,
  })

  done()
}
