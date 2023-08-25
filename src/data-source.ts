import { FastifyInstance } from 'fastify'
import 'reflect-metadata'
import migrationScript from "./script";
import { DataSource } from 'typeorm'
import { User } from './entity/User'
import { Organization } from './entity/Organization'
import { Database } from './entity/Database'
import { DatabaseTable } from './entity/DatabaseTable'
import { DataTableColumn } from './entity/DatabaseTableColumn'
import { DatabaseTableType } from './entity/DatabaseTabletype'
import { DatabaseTableFilter } from './entity/DatabaseTableFilter'
import { Billboard } from './entity/Billboard'
import { Chart } from './entity/Chart';
import { Tabular } from './entity/Tabular';


import envVars from './vars'

const models = [
  User,
  Organization,
  Database,
  DatabaseTableType,
  DatabaseTable,
  DataTableColumn,
  DatabaseTableFilter,
  Billboard,
  Chart,
  Tabular
]

export const AppDataSource = new DataSource({
  type: 'mssql',
  host: envVars.DB_HOST,
  port: +envVars.DB_PORT,
  username: envVars.DB_USERNAME,
  password: envVars.DB_PASSWORD,
  // database: envVars.DB_NAME,
  logging: true,
  synchronize: true,
  // migrationsRun: true,
  entities: models,
  // entities: ['/src/entity/*.ts'],
  migrations: ['/src/migrations/*.js'],
  options: {
    encrypt: false,
  },
})

export async function dbConnector(fastify: FastifyInstance) {
  try {
    await AppDataSource.initialize()
      .then(async () => {
        console.log('DB conn success')
        // migrationScript(AppDataSource)
      })
      .catch((error) => console.log(error))
  } catch (e) {
    console.error(`Something went dreadfully wrong: ${e}`)
  }
}
