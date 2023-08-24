import { FastifyReply, FastifyRequest, RouteHandlerMethod } from 'fastify'
import constants from '../constants'
import { AppDataSource } from '../data-source'
import { Tabular } from '../entity/Tabular'
import { createBody, updateBody } from '../request.types/tabular.body.types'
import { getOne, getAll } from '../request.types/tabular.query.types'

const tabularRepository = AppDataSource.getRepository(Tabular)

const createHandler = async function (
  req: FastifyRequest<{ Body: createBody }>,
  reply: FastifyReply,
) {
  const { db_table_id, tabular_title_ar, tabular_title_en } = req.body

  const tabular = await tabularRepository.create({
    db_table_id,
    tabular_title_ar,
    tabular_title_en,
    createdAt: new Date(),
    updatedAt: new Date(),
  })

  const tabularRes = await tabularRepository
    .createQueryBuilder('tabular')
    .insert()
    .values([
      {
        ...tabular,
      },
    ])
    .execute()

  return reply
    .code(constants.SUCCESS_CODE)
    .header(constants.CONTENT_TYPE, constants.APPLICATION_JSON)
    .send({
      tabular_id: tabularRes.raw[0].tabular_id,
      ...tabular,
    })
}

const updateHandler = async function (
  req: FastifyRequest<{ Body: updateBody }>,
  reply: FastifyReply,
) {
  const { tabular_id, tabular_title_ar, tabular_title_en } = req.body

  await tabularRepository.update(
    { tabular_id },
    {
      tabular_title_ar,
      tabular_title_en,
    },
  )

  return reply
    .code(constants.SUCCESS_CODE)
    .header(constants.CONTENT_TYPE, constants.APPLICATION_JSON)
    .send({
      tabular_id,
      tabular_title_ar,
      tabular_title_en,
    })
}

const getOneHandler: RouteHandlerMethod = async function (
  req: FastifyRequest<{ Querystring: getOne }>,
  reply: FastifyReply,
) {
  const { tabular_id } = req.query
  const tabular: Tabular = await tabularRepository
    .createQueryBuilder('tabular')
    .where('tabular.tabular_id = :tabular_id', {
      tabular_id,
    })
    .getOne()
  return reply
    .code(constants.SUCCESS_CODE)
    .header(constants.CONTENT_TYPE, constants.APPLICATION_JSON)
    .send({
      ...tabular,
    })
}

const getAllHandler = async function (
  req: FastifyRequest<{ Querystring: getAll }>,
  reply: FastifyReply,
) {
  const { organization_id } = req.query

  const tabulars = await tabularRepository
    .createQueryBuilder('tabular')
    .leftJoinAndSelect('tabular.db_table', 'db_table')
    .leftJoinAndSelect('db_table.db_table_type', 'db_table_type')
    .leftJoinAndSelect('db_table.database', 'database')
    .where('tabular.database.organization_id = :organization_id', {
      organization_id,
    })
    .getMany()

  return reply
    .code(constants.SUCCESS_CODE)
    .header(constants.CONTENT_TYPE, constants.APPLICATION_JSON)
    .send(tabulars)
}

export { createHandler, getOneHandler, updateHandler, getAllHandler }
