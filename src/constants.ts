export const constants = {
  NULL: null,
  FALSE: false,
  TRUE: true,
  ZERO: 0,
  MINUS_ONE: -1,
  ARRAY: [],
  OBJECT: {},


  AR_REGEX_PATTERN: /[\u0600-\u06FF\u0750-\u077F]/,


  SUCCESS_CODE: 200,
  ERROR_CODE: 500,
  WRITE_SUCCESS_CODE: 201,
  UNAUTH_CODE: 401,
  NOTFOUND_CODE: 404,
  AR: 'ar',
  EN: 'en',
 

  OBJECT_TYPE: 'object',
  ARRAY_TYPE: 'array',
  STRING_TYPE: 'string',
  NUMBER_TYPE: 'number',
  BOOL_TYPE: 'boolean',

  CONTENT_TYPE: 'Content-Type',
  APPLICATION_JSON: 'application/json; charset=utf-8',

  OBLIGATION_REQUIRED: 'required',
  OBLIGATION_OPTIONAL: 'optional',


  API_PREFIX: '/api',

  //SECTION -  SCHEMA Tags
  SCHEMA_TAG_USER: 'User',
  SCHEMA_TAG_ORGANIZATION: 'Organization',
  SCHEMA_TAG_BILLBOARD: 'Billboard',

  //SECTION -  SCHEMA Description
  SCHEMA_DESCRIPTION_USER: 'User',
  SCHEMA_DESCRIPTION_ORGANIZATION: 'Organization',
  SCHEMA_DESCRIPTION_BILLBOARD: 'Billboard',

  //SECTION - DBs
  MAIN_DB: "Artelco"
}

export default constants
