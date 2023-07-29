import { FastifySchema } from 'fastify'
import constants from '../constants'
import SchemaTypes from '../data/schema.types'
import schemaTypes from '../data/schema.types'

const createSchema = {
  tags: [constants.SCHEMA_TAG_ORGANIZATION],
  body: {
    type: constants.OBJECT_TYPE,
    properties: {
      organization_name: SchemaTypes.typeString,
      organization_description: SchemaTypes.typeString,
    },
    required: ['organization_name'],
  },
  response: {
    [constants.SUCCESS_CODE]: {
      type: constants.OBJECT_TYPE,
      properties: {
        organization_id: SchemaTypes.typeNumber,
        organization_name: SchemaTypes.typeString,
        organization_description: schemaTypes.typeString,
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
      organization_id: schemaTypes.typeNumber,
      organization_name: SchemaTypes.typeString,
      organization_description: SchemaTypes.typeString,
    },
    required: ['organization_id'],
  },
  response: {
    [constants.SUCCESS_CODE]: {
      type: constants.OBJECT_TYPE,
      properties: {
        organization_id: SchemaTypes.typeNumber,
        organization_name: SchemaTypes.typeString,
        organization_description: schemaTypes.typeString,
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
      organization_id: SchemaTypes.typeNumber,
    },
    required: ['organization_id'],
  },
  response: {
    [constants.SUCCESS_CODE]: {
      type: constants.OBJECT_TYPE,
      properties: {
        organization_id: SchemaTypes.typeNumber,
        organization_name: SchemaTypes.typeString,
        organization_description: schemaTypes.typeString,
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

export { createSchema, getOneSchema, updateSchema }
