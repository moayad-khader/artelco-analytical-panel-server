import constants from '../constants'
import SchemaTypes from '../data/schema.types'

const createSchema = {
  tags: [constants.SCHEMA_TAG_TABULAR],
  body: {
    type: constants.OBJECT_TYPE,
    properties: {
      db_table_id: SchemaTypes.typeNumber,
      tabular_title_ar: SchemaTypes.typeString,
      tabular_title_en: SchemaTypes.typeString,
    },
    required: ['db_table_id', 'tabular_title_ar', 'tabular_title_en'],
  },
  response: {
    [constants.SUCCESS_CODE]: {
      type: constants.OBJECT_TYPE,
      properties: {
        tabular_id: SchemaTypes.typeNumber,
        db_table_id: SchemaTypes.typeNumber,
        tabular_title_ar: SchemaTypes.typeString,
        tabular_title_en: SchemaTypes.typeString,
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
  tags: [constants.SCHEMA_TAG_TABULAR],
  body: {
    type: constants.OBJECT_TYPE,
    properties: {
      tabular_id: SchemaTypes.typeNumber,
      db_table_id: SchemaTypes.typeNumber,
      tabular_title_ar: SchemaTypes.typeString,
      tabular_title_en: SchemaTypes.typeString,
    },
    required: ['tabular_id'],
  },
  response: {
    [constants.SUCCESS_CODE]: {
      type: constants.OBJECT_TYPE,
      properties: {
        tabular_id: SchemaTypes.typeNumber,
        db_table_id: SchemaTypes.typeNumber,
        tabular_title_ar: SchemaTypes.typeString,
        tabular_title_en: SchemaTypes.typeString,
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
  tags: [constants.SCHEMA_TAG_TABULAR],
  querystring: {
    type: constants.OBJECT_TYPE,
    properties: {
      tabular_id: SchemaTypes.typeNumber,
    },
    required: ['tabular_id'],
  },
  response: {
    [constants.SUCCESS_CODE]: {
      type: constants.OBJECT_TYPE,
      properties: {
        tabular_id: SchemaTypes.typeNumber,
        db_table_id: SchemaTypes.typeNumber,
        tabular_title_ar: SchemaTypes.typeString,
        tabular_title_en: SchemaTypes.typeString,
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
  tags: [constants.SCHEMA_TAG_TABULAR],
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
        tabular_id: SchemaTypes.typeNumber,
        db_table_id: SchemaTypes.typeNumber,
        tabular_title_ar: SchemaTypes.typeString,
        tabular_title_en: SchemaTypes.typeString,
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
