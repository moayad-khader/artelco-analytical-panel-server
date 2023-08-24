import {
  createHandler,
  updateHandler,
  getOneHandler,
  getAllHandler,
} from '../handlers/chart.handler'
import {
  createSchema,
  updateSchema,
  getOneSchema,
  getAllSchema,
} from '../schemas/chart.schema'
import { createBody, updateBody } from '../request.types/chart.body.types'
import { FastifyInstance } from 'fastify'
import { checkAuthorization } from '../utils/user.utils'
import Routes from '../routes'
import { getAll, getOne } from '@artelco/request.types/chart.query.types'

export default (fastify: FastifyInstance, opts, done) => {
  fastify.post<{ Body: createBody }>(Routes.chart, {
    // preValidation: checkAuthorization,
    schema: createSchema,
    handler: createHandler,
  })

  fastify.patch<{ Body: updateBody }>(Routes.chart, {
    // preValidation: checkAuthorization,
    schema: updateSchema,
    handler: updateHandler,
  })

  fastify.get<{ Querystring: getOne }>(Routes.chart_single, {
    // preValidation: checkAuthorization,
    schema: getOneSchema,
    handler: getOneHandler,
  })

  fastify.get<{ Querystring: getAll }>(Routes.chart, {
    // preValidation: checkAuthorization,
    schema: getAllSchema,
    handler: getAllHandler,
  })

  done()
}
