import { FastifyReply, FastifyRequest, RouteHandlerMethod } from 'fastify'
import constants from '../constants'
import { AppDataSource } from '../data-source'
import { Organization } from '../entity/Organization'
import messages from '../messages'
import {
  createBody,
  updateBody,
} from '../request.types/organization.body.types'
import { getOne } from '../request.types/organization.query.types'

const organizationRepository = AppDataSource.getRepository(Organization)

const createHandler = async function (
  req: FastifyRequest<{ Body: createBody }>,
  reply: FastifyReply,
) {
  const { organization_description, organization_name } = req.body

  const organization = await organizationRepository.create({
    organization_description,
    organization_name,
    createdAt: new Date(),
    updatedAt: new Date(),
  })

  const organizationRes = await organizationRepository
    .createQueryBuilder('organization')
    .insert()
    .values([
      {
        ...organization,
      },
    ])
    .execute()

  console.log("organizationRes",organizationRes)
  return reply
    .code(constants.SUCCESS_CODE)
    .header(constants.CONTENT_TYPE, constants.APPLICATION_JSON)
    .send({
      organization_id: organizationRes.raw[0].organization_id,
      ...organization,
    })
}

const updateHandler = async function (
  req: FastifyRequest<{ Body: updateBody }>,
  reply: FastifyReply,
) {
  const { organization_id, organization_description, organization_name } =
    req.body
  await organizationRepository.update(
    { organization_id },
    {
      organization_description,
      organization_name,
    },
  )

  return reply
    .code(constants.SUCCESS_CODE)
    .header(constants.CONTENT_TYPE, constants.APPLICATION_JSON)
    .send({
      organization_id,
      organization_description,
      organization_name,
    })
}

const getOneHandler: RouteHandlerMethod = async function (
  req: FastifyRequest<{ Querystring: getOne }>,
  reply: FastifyReply,
) {
  const { organization_id } = req.query
  const organization: Organization = await organizationRepository
    .createQueryBuilder('organization')
    .where('organization.organization_id = :organization_id', {
      organization_id,
    })
    .getOne()
  return reply
    .code(constants.SUCCESS_CODE)
    .header(constants.CONTENT_TYPE, constants.APPLICATION_JSON)
    .send({
      ...organization,
    })
}

export { createHandler, getOneHandler, updateHandler }
