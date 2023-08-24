import { FastifyReply, FastifyRequest, RouteHandlerMethod } from 'fastify'
import constants from '../constants'
import { AppDataSource } from '../data-source'
import { Chart } from '../entity/Chart'
import { createBody, updateBody } from '../request.types/chart.body.types'
import { getOne, getAll } from '../request.types/chart.query.types'

const chartRepository = AppDataSource.getRepository(Chart)

const createHandler = async function (
  req: FastifyRequest<{ Body: createBody }>,
  reply: FastifyReply,
) {
  const {
    db_table_column_id,
    db_table_filter_id,
    chart_dependency,
    chart_title_en,
    chart_title_ar,
    chart_type,
  } = req.body

  const chart = await chartRepository.create({
    db_table_column_id,
    db_table_filter_id,
    chart_dependency,
    chart_title_en,
    chart_title_ar,
    chart_type,
    createdAt: new Date(),
    updatedAt: new Date(),
  })

  const chartRes = await chartRepository
    .createQueryBuilder('chart')
    .insert()
    .values([
      {
        ...chart,
      },
    ])
    .execute()

  return reply
    .code(constants.SUCCESS_CODE)
    .header(constants.CONTENT_TYPE, constants.APPLICATION_JSON)
    .send({
      chart_id: chartRes.raw[0].chart_id,
      ...chart,
    })
}

const updateHandler = async function (
  req: FastifyRequest<{ Body: updateBody }>,
  reply: FastifyReply,
) {
  const {
    chart_id,
    db_table_column_id,
    db_table_filter_id,
    chart_dependency,
    chart_title_en,
    chart_title_ar,
    chart_type,
  } = req.body

  await chartRepository.update(
    { chart_id },
    {
      chart_id,
      db_table_column_id,
      db_table_filter_id,
      chart_dependency,
      chart_title_en,
      chart_title_ar,
      chart_type,
    },
  )

  return reply
    .code(constants.SUCCESS_CODE)
    .header(constants.CONTENT_TYPE, constants.APPLICATION_JSON)
    .send({
      chart_id,
      db_table_column_id,
      db_table_filter_id,
      chart_dependency,
      chart_title_en,
      chart_title_ar,
      chart_type,
    })
}

const getOneHandler: RouteHandlerMethod = async function (
  req: FastifyRequest<{ Querystring: getOne }>,
  reply: FastifyReply,
) {
  const { chart_id } = req.query
  const chart: Chart = await chartRepository
    .createQueryBuilder('chart')
    .where('chart.chart_id = :chart_id', {
      chart_id,
    })
    .getOne()
  return reply
    .code(constants.SUCCESS_CODE)
    .header(constants.CONTENT_TYPE, constants.APPLICATION_JSON)
    .send({
      ...chart,
    })
}

const getAllHandler = async function (
  req: FastifyRequest<{ Querystring: getAll }>,
  reply: FastifyReply,
) {
  const { organization_id } = req.query

  const charts = await chartRepository
    .createQueryBuilder('chart')
    .leftJoinAndSelect('chart.db_table_filter', 'db_table_filter')
    .leftJoinAndSelect('chart.db_table_column', 'db_table_column')
    .leftJoinAndSelect('db_table_column.db_table', 'db_table')
    .leftJoinAndSelect('db_table.db_table_type', 'db_table_type')
    .leftJoinAndSelect('db_table.database', 'database')
    .where('chart.database.organization_id = :organization_id', {
      organization_id,
    })
    .getMany()

  return reply
    .code(constants.SUCCESS_CODE)
    .header(constants.CONTENT_TYPE, constants.APPLICATION_JSON)
    .send(charts)
}

export { createHandler, getOneHandler, updateHandler, getAllHandler }
