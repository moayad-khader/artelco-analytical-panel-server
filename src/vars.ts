import * as dotenv from 'dotenv'
dotenv.config({ path: __dirname + '/.env' })

export default dotenv.config().parsed
