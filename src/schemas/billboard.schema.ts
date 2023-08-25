import { FastifySchema } from 'fastify'
import constants from '../constants'
import SchemaTypes from '../data/schema.types'

const createSchema = {
  tags: [constants.SCHEMA_TAG_BILLBOARD],
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
    required: [
      'db_table_column_id',
      'db_table_filter_id',
      'billboard_title_ar',
      'billboard_title_en',
      'billboard_icon',
      'billboard_type',
      'billboard_metric_type'
    ],
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
  tags: [constants.SCHEMA_TAG_BILLBOARD],
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

const getOneSchema = {
  tags: [constants.SCHEMA_TAG_BILLBOARD],
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


const getData = {
  tags: [constants.SCHEMA_TAG_BILLBOARD],
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
        result: SchemaTypes.typeAny
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
  tags: [constants.SCHEMA_TAG_BILLBOARD],
  querystring: {
    type: constants.OBJECT_TYPE,
    properties: {
      orgnaization_id: SchemaTypes.typeNumber,
    },
    required: ['orgnaization_id'],
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

export { createSchema, getOneSchema, updateSchema, getAllSchema, getData }
