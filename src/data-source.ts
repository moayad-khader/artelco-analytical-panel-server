import { FastifyInstance } from 'fastify'
import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User } from './entity/User'
import { Organization } from "./entity/Organization";

import envVars from './vars'

const models = [
  User,
  Organization
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
      })
      .catch((error) => console.log(error))
  } catch (e) {
    console.error(`Something went dreadfully wrong: ${e}`)
  }
}
