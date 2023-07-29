import { FastifyInstance } from 'fastify'
import {
  createUserHandler,
  loginHandler,
  updateHandler,
} from '../handlers/user.handler'
import {
  loginUser,
  registerUser,
  updateBody,
} from '../request.types/user.body.types'
import {
  createUserSchema,
  loginUserSchema,
  updateSchema,
} from '../schemas/user.schema'
import { checkAuthorization } from '../utils/user.utils'

export default (fastify: FastifyInstance, opts, done) => {
  fastify.post<{ Body: registerUser }>('/user/register', {
    preValidation: checkAuthorization,
    schema: createUserSchema,
    handler: createUserHandler,
  })

  fastify.post<{ Body: loginUser }>('/user/login', {
    //preValidation: checkAuthorization,
    schema: loginUserSchema,
    handler: loginHandler,
  })

  fastify.patch<{ Body: updateBody }>('/user', {
    preValidation: checkAuthorization,
    schema: updateSchema,
    handler: updateHandler,
  })



  done()
}
