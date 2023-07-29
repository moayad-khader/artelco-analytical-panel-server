import crypto from 'crypto'
import { FastifyReply, FastifyRequest, RouteHandlerMethod } from 'fastify'
import constants from '../constants'
import { AppDataSource } from '../data-source'
import { User } from '../entity/User'
import messages from '../messages'
import {
  loginUser,
  registerUser,
  updateBody,
} from '../request.types/user.body.types'
import {
  generateToken,
  getHash,
  getSalt,
  validatePassword,
} from '../utils/user.utils'

const userRepository = AppDataSource.getRepository(User)




const createUserHandler: RouteHandlerMethod = async function (
  req: FastifyRequest<{ Body: registerUser }>,
  reply: FastifyReply,
) {
  const { user_name, password, organization_id } = req.body

  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 512, 'sha512')
    .toString('hex')
  

  //AppDataSource
  const data = {
    user_name,
    organization_id,
    salt,
    hash,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  const user: User = userRepository.create({
    ...data,
  })

  console.log(user)

  const userInRes = await userRepository
    .createQueryBuilder('user')
    .insert()
    .values([
      {
        ...user,
      },
    ])
    .execute()
  
  const token = generateToken(userInRes.raw[0].user_id,false)
  console.log("token",token)
  return reply
    .code(constants.SUCCESS_CODE)
    .header(constants.CONTENT_TYPE, constants.APPLICATION_JSON)
    .send({
      user: {
        user_id: user.user_id,
        user_name: user.user_name,
        token: token,
      },
    })
}


const updateHandler = async (
  req: FastifyRequest<{ Body: updateBody }>,
  reply: FastifyReply,
) => {
  const { user_id, user_name } = req.body

  const user = userRepository.create({
    user_name,
    updatedAt: new Date(),
  })

  await userRepository
    .createQueryBuilder('user')
    .update()
    .set({
      ...user,
    })
    .where('user_id = :user_id', { user_id })
    .execute()

  return reply
    .code(constants.SUCCESS_CODE)
    .header(constants.CONTENT_TYPE, constants.APPLICATION_JSON)
    .send({
      user_id,
      user_name,
    })
}

const loginHandler = async (
  req: FastifyRequest<{ Body: loginUser }>,
  reply: FastifyReply,
) => {
  const { user_name, password } = req.body

  const user: User = await userRepository
    .createQueryBuilder('user')
    .where('user_name= :user_name', { email: user_name.toLowerCase().trim() })
    .getOne()
  if (!user) {
    return reply
      .code(constants.UNAUTH_CODE)
      .header(constants.CONTENT_TYPE, constants.APPLICATION_JSON)
      .send({
        message: messages.UNAUTH_LOGIN,
      })
  }
  const isPswrdValid: boolean = validatePassword(user, password)
  const token = generateToken(user.user_id, false)
  if (!isPswrdValid) {
    return reply
      .code(constants.UNAUTH_CODE)
      .header(constants.CONTENT_TYPE, constants.APPLICATION_JSON)
      .send({
        message: messages.UNAUTH_LOGIN,
      })
  } else {
    return reply
      .code(constants.SUCCESS_CODE)
      .header(constants.CONTENT_TYPE, constants.APPLICATION_JSON)
      .send({
        user: {
          ...user,
          token,
        },
      })
  }
}





export {
  createUserHandler,
  loginHandler,
  updateHandler,
}
