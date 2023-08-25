import { FastifyReply, FastifyRequest, RouteHandlerMethod } from 'fastify'
import { getManager } from 'typeorm'
import constants from '../constants'
import { AppDataSource } from '../data-source'
import { Billboard } from '../entity/Billboard'
import { queryBuilder } from '../utils/billboard.utils'
import { createBody, updateBody } from '../request.types/billboard.body.types'
import { getOne, getAll } from '../request.types/billboard.query.types'

const billboardRepository = AppDataSource.getRepository(Billboard)

const createHandler = async function (
  req: FastifyRequest<{ Body: createBody }>,
  reply: FastifyReply,
) {
  const {
    db_table_column_id,
    db_table_filter_id,
    billboard_title_ar,
    billboard_title_en,
    billboard_icon,
    billboard_type,
    billboard_metric_type,
    billboard_threshold_warning,
    billboard_threshold_danger,
  } = req.body

  const billboard = await billboardRepository.create({
    db_table_column_id,
    db_table_filter_id,
    billboard_title_ar,
    billboard_title_en,
    billboard_icon,
    billboard_type,
    billboard_metric_type,
    billboard_threshold_warning,
    billboard_threshold_danger,
    createdAt: new Date(),
    updatedAt: new Date(),
  })

  const billboardRes = await billboardRepository
    .createQueryBuilder('billboard')
    .insert()
    .values([
      {
        ...billboard,
      },
    ])
    .execute()

  return reply
    .code(constants.SUCCESS_CODE)
    .header(constants.CONTENT_TYPE, constants.APPLICATION_JSON)
    .send({
      billboard_id: billboardRes.raw[0].billboard_id,
      ...billboard,
    })
}

const updateHandler = async function (
  req: FastifyRequest<{ Body: updateBody }>,
  reply: FastifyReply,
) {
  const {
    billboard_id,
    db_table_column_id,
    db_table_filter_id,
    billboard_title_ar,
    billboard_title_en,
    billboard_icon,
    billboard_type,
    billboard_metric_type,
    billboard_threshold_warning,
    billboard_threshold_danger,
  } = req.body

  await billboardRepository.update(
    { billboard_id },
    {
      db_table_column_id,
      db_table_filter_id,
      billboard_title_ar,
      billboard_title_en,
      billboard_icon,
      billboard_type,
      billboard_metric_type,
      billboard_threshold_warning,
      billboard_threshold_danger,
    },
  )

  return reply
    .code(constants.SUCCESS_CODE)
    .header(constants.CONTENT_TYPE, constants.APPLICATION_JSON)
    .send({
      billboard_id,
      db_table_column_id,
      db_table_filter_id,
      billboard_title_ar,
      billboard_title_en,
      billboard_icon,
      billboard_type,
      billboard_metric_type,
      billboard_threshold_warning,
      billboard_threshold_danger,
    })
}

const getOneHandler: RouteHandlerMethod = async function (
  req: FastifyRequest<{ Querystring: getOne }>,
  reply: FastifyReply,
) {
  const { billboard_id } = req.query
  const billboard: Billboard = await billboardRepository
    .createQueryBuilder('billboard')
    .where('billboard.billboard_id = :billboard_id', {
      billboard_id,
    })
    .getOne()
  return reply
    .code(constants.SUCCESS_CODE)
    .header(constants.CONTENT_TYPE, constants.APPLICATION_JSON)
    .send({
      ...billboard,
    })
}

const getAllHandler = async function (
  req: FastifyRequest<{ Querystring: getAll }>,
  reply: FastifyReply,
) {
  const { organization_id } = req.query

  const billboards = await billboardRepository
    .createQueryBuilder('billboard')
    // .leftJoinAndSelect('billboard.db_table_filter', 'db_table_filter')
    .leftJoinAndSelect('billboard.db_table_column', 'db_table_column')
    .leftJoinAndSelect('db_table_column.db_table', 'db_table')
    .leftJoinAndSelect('db_table.db_table_type', 'db_table_type')
    .leftJoinAndSelect('db_table.database', 'database')
    .where('billboard.database.organization_id = :organization_id', {
      organization_id,
    })
    .getMany()

  return reply
    .code(constants.SUCCESS_CODE)
    .header(constants.CONTENT_TYPE, constants.APPLICATION_JSON)
    .send(billboards)
}

const getDataHandler = async function (
  req: FastifyRequest<{ Querystring: getOne }>,
  reply: FastifyReply,
) {
  const { billboard_id } = req.query
  const billboard: Billboard = await billboardRepository
    .createQueryBuilder('billboard')
    // .leftJoinAndSelect('billboard.db_table_filter', 'db_table_filter')
    .leftJoinAndSelect('billboard.db_table_column', 'db_table_column')
    .leftJoinAndSelect('db_table_column.db_table', 'db_table')
    .leftJoinAndSelect('db_table.db_table_type', 'db_table_type')
    .leftJoinAndSelect('db_table.database', 'database')
    .where('billboard.billboard_id = :billboard_id', {
      billboard_id,
    })
    .getOne()

  const sqlQuery = queryBuilder(billboard)
  const queryRunner = await AppDataSource.createQueryRunner()
  var result = await queryRunner.manager.query(sqlQuery)
  return reply
    .code(constants.SUCCESS_CODE)
    .header(constants.CONTENT_TYPE, constants.APPLICATION_JSON)
    .send(result)
}

export {
  createHandler,
  getOneHandler,
  updateHandler,
  getAllHandler,
  getDataHandler,
}
