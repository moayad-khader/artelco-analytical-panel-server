import crypto from 'crypto'
import {
  FastifyReply,
  FastifyRequest,
  HookHandlerDoneFunction,
  preHandlerHookHandler,
} from 'fastify'
import jwt from 'jsonwebtoken'
import constants from '../constants'
import { AppDataSource } from '../data-source'
import AuthorizaedTokens from '../data/Tokens'
import { User } from '../entity/User'
import messages from '../messages'
import envVars from '../vars'

const userRepository = AppDataSource.getRepository(User)

const secret = envVars.SECRET

const validateUserResetToken = async (token: string) => {
  try {
    const { user_id, db_id, date } = await jwt.verify(token, secret)
    const currDate = new Date()
    if (currDate.getTime() - date.getTime() > 172800000) {
      return false
    } else {
      return true
    }
  } catch (error) {
    return false
  }
}

const validatePassword = function (user: User, password: string): boolean {
  var hash = crypto
    .pbkdf2Sync(password, user.salt, 10000, 512, 'sha512')
    .toString('hex')
  return user.hash === hash
}

const getHash = function (password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex')
}

const getSalt = (): string => crypto.randomBytes(16).toString('hex')

const generateToken = function (
  user_id: number,
  dateTimeStamp = false,
): string {
  //SECTION  Where u can add more data to the token datetime
  const date = new Date()
  const token = jwt.sign(
    dateTimeStamp
      ? {
          user_id,
          date,
        }
      : {
          user_id,
        },
    secret,
  )
  return token
}

const verifyToken = async (req) => {
  const staticToken = AuthorizaedTokens.find(
    (at) =>
      at.route === req.url &&
      at.method === req.method &&
      at.token === req.headers.authorization,
  )

  if (staticToken) {
    return true
  }
  try {
    const { authorization } = req.headers
    const token = authorization.split(' ')[1]
    const { user_id, db_id } = await jwt.verify(token, secret)
    const success: boolean =
      (user_id === req.body?.user_id || user_id === +req.query?.user_id) &&
      (db_id === req.body?.db_id || db_id === +req.query?.db_id)

    return success
  } catch (e) {
    return false
  }
}

const generateForgotLink = (user_id: number, db_id: number) => {
  const token = generateToken(user_id, true)
  const link = `${envVars.PLATFORM_URL}/reset-password?key=${token}`
  return { link, token }
}

const checkAuthorization: preHandlerHookHandler = async (
  req: FastifyRequest<{ Body: any; Querystring: any }>,
  reply: FastifyReply,
  done: HookHandlerDoneFunction,
) => {
  //TODO DateTime check
  const isSuccessfullyAuth = await verifyToken(req)
  if (!isSuccessfullyAuth) {
    return reply
      .code(constants.UNAUTH_CODE)
      .send({ message: messages.INVALID_TOKEN })
  }
}

export {
  checkAuthorization,
  generateForgotLink,
  generateToken,
  getHash,
  getSalt,
  validatePassword,
  validateUserResetToken,
  verifyToken,
}
