import constants from '../constants'
import SchemaTypes from '../data/schema.types'

const createSchema = {
  tags: [constants.SCHEMA_TAG_CHART],
  body: {
    type: constants.OBJECT_TYPE,
    properties: {
      db_table_column_id: SchemaTypes.typeNumber,
      db_table_filter_id: SchemaTypes.typeNumber,
      chart_title_ar: SchemaTypes.typeString,
      chart_title_en: SchemaTypes.typeString,
      chart_dependency: SchemaTypes.typeString,
      chart_type: SchemaTypes.typeString,
    },
    required: [
      'db_table_column_id',
      'db_table_filter_id',
      'chart_title_ar',
      'chart_title_en',
      'chart_dependency',
      'chart_type',
    ],
  },
  response: {
    [constants.SUCCESS_CODE]: {
      type: constants.OBJECT_TYPE,
      properties: {
        chart_id: SchemaTypes.typeNumber,
        db_table_column_id: SchemaTypes.typeNumber,
        db_table_filter_id: SchemaTypes.typeNumber,
        chart_title_ar: SchemaTypes.typeString,
        chart_title_en: SchemaTypes.typeString,
        chart_dependency: SchemaTypes.typeString,
        chart_type: SchemaTypes.typeString,
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
  tags: [constants.SCHEMA_TAG_CHART],
  body: {
    type: constants.OBJECT_TYPE,
    properties: {
      chart_id: SchemaTypes.typeNumber,
      db_table_column_id: SchemaTypes.typeNumber,
      db_table_filter_id: SchemaTypes.typeNumber,
      chart_title_ar: SchemaTypes.typeString,
      chart_title_en: SchemaTypes.typeString,
      chart_dependency: SchemaTypes.typeString,
      chart_type: SchemaTypes.typeString,
    },
    required: ['chart_id'],
  },
  response: {
    [constants.SUCCESS_CODE]: {
      type: constants.OBJECT_TYPE,
      properties: {
        chart_id: SchemaTypes.typeNumber,
        db_table_column_id: SchemaTypes.typeNumber,
        db_table_filter_id: SchemaTypes.typeNumber,
        chart_title_ar: SchemaTypes.typeString,
        chart_title_en: SchemaTypes.typeString,
        chart_dependency: SchemaTypes.typeString,
        chart_type: SchemaTypes.typeString,
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
  tags: [constants.SCHEMA_TAG_CHART],
  querystring: {
    type: constants.OBJECT_TYPE,
    properties: {
      chart_id: SchemaTypes.typeNumber,
    },
    required: ['chart_id'],
  },
  response: {
    [constants.SUCCESS_CODE]: {
      type: constants.OBJECT_TYPE,
      properties: {
        chart_id: SchemaTypes.typeNumber,
        db_table_column_id: SchemaTypes.typeNumber,
        db_table_filter_id: SchemaTypes.typeNumber,
        chart_title_ar: SchemaTypes.typeString,
        chart_title_en: SchemaTypes.typeString,
        chart_dependency: SchemaTypes.typeString,
        chart_type: SchemaTypes.typeString,
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
  tags: [constants.SCHEMA_TAG_CHART],
  querystring: {
    type: constants.OBJECT_TYPE,
    properties: {
      organization_id: SchemaTypes.typeNumber,
    },
    required: ['organization_id'],
  },
  response: {
    [constants.SUCCESS_CODE]: {
      type: constants.ARRAY_TYPE,
      properties: {
        chart_id: SchemaTypes.typeNumber,
        db_table_column_id: SchemaTypes.typeNumber,
        db_table_filter_id: SchemaTypes.typeNumber,
        chart_title_ar: SchemaTypes.typeString,
        chart_title_en: SchemaTypes.typeString,
        chart_dependency: SchemaTypes.typeString,
        chart_type: SchemaTypes.typeString,
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
