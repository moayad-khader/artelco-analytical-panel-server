import { FastifySchema } from 'fastify'
import constants from '../constants'
import SchemaTypes from '../data/schema.types'
import schemaTypes from '../data/schema.types'

const createSchema = {
  tags: [constants.SCHEMA_TAG_ORGANIZATION],
  body: {
    type: constants.OBJECT_TYPE,
    properties: {
        db_table_column_id: SchemaTypes.typeNumber,
        db_table_filter_id: SchemaTypes.typeNumber,
        billboard_title_ar: SchemaTypes.typeString,
        billboard_title_en: SchemaTypes.typeString,
        billboard_icon: SchemaTypes.typeString,
        billboard_type: SchemaTypes.typeString,
        billboard_metric_type: SchemaTypes.typeString,
        billboard_threshold_warning: SchemaTypes.typeNumber,
        billboard_threshold_danger: SchemaTypes.typeNumber,
    },
    required: ['organization_name'],
  },
  response: {
    [constants.SUCCESS_CODE]: {
      type: constants.OBJECT_TYPE,
      properties: {
        billboard_id: SchemaTypes.typeNumber,
        db_table_column_id: SchemaTypes.typeNumber,
        db_table_filter_id: SchemaTypes.typeNumber,
        billboard_title_ar: SchemaTypes.typeString,
        billboard_title_en: SchemaTypes.typeString,
        billboard_icon: SchemaTypes.typeString,
        billboard_type: SchemaTypes.typeString,
        billboard_metric_type: SchemaTypes.typeString,
        billboard_threshold_warning: SchemaTypes.typeNumber,
        billboard_threshold_danger: SchemaTypes.typeNumber,
      },
    },
    [constants.UNAUTH_CODE]: {
      type: constants.OBJECT_TYPE,
      properties: {
        message: SchemaTypes.typeString,
      },
    },
  },
}

const updateSchema = {
  tags: [constants.SCHEMA_TAG_ORGANIZATION],
  body: {
    type: constants.OBJECT_TYPE,
    properties: {
      billboard_id: SchemaTypes.typeNumber,
      db_table_column_id: SchemaTypes.typeNumber,
      db_table_filter_id: SchemaTypes.typeNumber,
      billboard_title_ar: SchemaTypes.typeString,
      billboard_title_en: SchemaTypes.typeString,
      billboard_icon: SchemaTypes.typeString,
      billboard_type: SchemaTypes.typeString,
      billboard_metric_type: SchemaTypes.typeString,
      billboard_threshold_warning: SchemaTypes.typeNumber,
      billboard_threshold_danger: SchemaTypes.typeNumber,
    },
    required: ['organization_id'],
  },
  response: {
    [constants.SUCCESS_CODE]: {
      type: constants.OBJECT_TYPE,
      properties: {
        billboard_id: SchemaTypes.typeNumber,
        db_table_column_id: SchemaTypes.typeNumber,
        db_table_filter_id: SchemaTypes.typeNumber,
        billboard_title_ar: SchemaTypes.typeString,
        billboard_title_en: SchemaTypes.typeString,
        billboard_icon: SchemaTypes.typeString,
        billboard_type: SchemaTypes.typeString,
        billboard_metric_type: SchemaTypes.typeString,
        billboard_threshold_warning: SchemaTypes.typeNumber,
        billboard_threshold_danger: SchemaTypes.typeNumber,
      },
    },
    [constants.UNAUTH_CODE]: {
      type: constants.OBJECT_TYPE,
      properties: {
        message: SchemaTypes.typeString,
      },
    },
  },
}

const getOneSchema = {
  tags: [constants.SCHEMA_TAG_ORGANIZATION],
  querystring: {
    type: constants.OBJECT_TYPE,
    properties: {
      billboard_id: SchemaTypes.typeNumber,
    },
    required: ['billboard_id'],
  },
  response: {
    [constants.SUCCESS_CODE]: {
      type: constants.OBJECT_TYPE,
      properties: {
        billboard_id: SchemaTypes.typeNumber,
        db_table_column_id: SchemaTypes.typeNumber,
        db_table_filter_id: SchemaTypes.typeNumber,
        billboard_title_ar: SchemaTypes.typeString,
        billboard_title_en: SchemaTypes.typeString,
        billboard_icon: SchemaTypes.typeString,
        billboard_type: SchemaTypes.typeString,
        billboard_metric_type: SchemaTypes.typeString,
        billboard_threshold_warning: SchemaTypes.typeNumber,
        billboard_threshold_danger: SchemaTypes.typeNumber,
      },
    },
    [constants.UNAUTH_CODE]: {
      type: constants.OBJECT_TYPE,
      properties: {
        message: SchemaTypes.typeString,
      },
    },
  },
}

const getAllSchema = {
  tags: [constants.SCHEMA_TAG_ORGANIZATION],
  querystring: {
    type: constants.OBJECT_TYPE,
    properties: {
      billboard_id: SchemaTypes.typeNumber,
    },
    required: ['billboard_id'],
  },
  response: {
    [constants.SUCCESS_CODE]: {
      type: constants.ARRAY_TYPE,
      properties: {
        billboard_id: SchemaTypes.typeNumber,
        db_table_column_id: SchemaTypes.typeNumber,
        db_table_filter_id: SchemaTypes.typeNumber,
        billboard_title_ar: SchemaTypes.typeString,
        billboard_title_en: SchemaTypes.typeString,
        billboard_icon: SchemaTypes.typeString,
        billboard_type: SchemaTypes.typeString,
        billboard_metric_type: SchemaTypes.typeString,
        billboard_threshold_warning: SchemaTypes.typeNumber,
        billboard_threshold_danger: SchemaTypes.typeNumber,
      },
    },
    [constants.UNAUTH_CODE]: {
      type: constants.OBJECT_TYPE,
      properties: {
        message: SchemaTypes.typeString,
      },
    },
  },
}

export { createSchema, getOneSchema, updateSchema, getAllSchema }
