import constants from '../constants'
import SchemaTypes from '../data/schema.types'

const getUserSchema = {
  tags: [constants.SCHEMA_TAG_USER],
  querystring: {
    type: constants.OBJECT_TYPE,
    properties: {
      id: SchemaTypes.typeString,
    },
    required: ['id'],
  },
  response: {
    [constants.SUCCESS_CODE]: {
      type: constants.OBJECT_TYPE,
      properties: {
        user: {
          user_id: SchemaTypes.typeNumber,
          user_name: SchemaTypes.typeString,
          token: SchemaTypes.typeString,
        },
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



const loginUserSchema = {
  tags: [constants.SCHEMA_TAG_USER],
  body: {
    type: constants.OBJECT_TYPE,
    properties: {
      user_name: SchemaTypes.typeString,
      password: SchemaTypes.typeString,
    },
    required: ['user_name', 'password'],
  },
  response: {
    [constants.SUCCESS_CODE]: {
      type: constants.OBJECT_TYPE,
      properties: {
        user: {
          type: constants.OBJECT_TYPE,
          properties: {
            user_id: SchemaTypes.typeNumber,
            user_name: SchemaTypes.typeString,
            organization_id: SchemaTypes.typeNumber,
            token: SchemaTypes.typeString,
          },
        },
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
  tags: [constants.SCHEMA_TAG_USER],
  body: {
    type: constants.OBJECT_TYPE,
    properties: {
      user_id: SchemaTypes.typeNumber,
      user_name: SchemaTypes.typeString,
    },
    required: ['user_id'],
  },
  response: {
    [constants.SUCCESS_CODE]: {
      type: constants.OBJECT_TYPE,
      properties: {
        user_id: SchemaTypes.typeNumber,
        user_name: SchemaTypes.typeString,
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

const createUserSchema = {
  tags: [constants.SCHEMA_TAG_USER],
  body: {
    type: constants.OBJECT_TYPE,
    properties: {
      user_name: SchemaTypes.typeString,
      password: SchemaTypes.typeString,
      organization_id: SchemaTypes.typeNumber
    },
    required: ['user_name', 'password', 'organization_id'],
  },
  response: {
    [constants.SUCCESS_CODE]: {
      type: constants.OBJECT_TYPE,
      properties: {
        user: {
          user_name: SchemaTypes.typeString,
          organization_id: SchemaTypes.typeNumber,
          token: SchemaTypes.typeString,
        },
      },
    },
    [constants.UNAUTH_CODE]: {
      type: constants.OBJECT_TYPE,
      properties: {
        message: SchemaTypes.typeString,
      },
    },
  }
}


export {
  getUserSchema,
  createUserSchema,
  loginUserSchema,
  updateSchema,
}
