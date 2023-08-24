import {
  createHandler,
  updateHandler,
  getOneHandler,
  getAllHandler,
} from '../handlers/tabular.handler'
import {
  createSchema,
  updateSchema,
  getOneSchema,
  getAllSchema,
} from '../schemas/tabular.schema'
import { createBody, updateBody } from '../request.types/tabular.body.types'
import { FastifyInstance } from 'fastify'
import Routes from '../routes'
import { getAll, getOne } from '@artelco/request.types/tabular.query.types'

export default (fastify: FastifyInstance, opts, done) => {
  fastify.post<{ Body: createBody }>(Routes.tabular, {
    // preValidation: checkAuthorization,
    schema: createSchema,
    handler: createHandler,
  })

  fastify.patch<{ Body: updateBody }>(Routes.tabular, {
    // preValidation: checkAuthorization,
    schema: updateSchema,
    handler: updateHandler,
  })

  fastify.get<{ Querystring: getOne }>(Routes.tabular_single, {
    // preValidation: checkAuthorization,
    schema: getOneSchema,
    handler: getOneHandler,
  })

  fastify.get<{ Querystring: getAll }>(Routes.tabular, {
    // preValidation: checkAuthorization,
    schema: getAllSchema,
    handler: getAllHandler,
  })

  done()
}
