import { emit } from 'process'
import RTDTables from './data/RTDTables'
import RTDTableTypes from './data/RTDTableTypes'

import { Database } from './entity/Database'
import { DatabaseTable } from './entity/DatabaseTable'
import { DatabaseTableType } from './entity/DatabaseTabletype'
import {  Organization } from "./entity/Organization";
import { DataTableColumn } from './entity/DatabaseTableColumn'



const distinct = (arr, by) =>
  arr.reduce((acc, current) => {
    const x = acc.find((item) => item[by] === current[by])
    if (!x) {
      return acc.concat([current])
    } else {
      return acc
    }
  }, [])

const tables = distinct(RTDTables, 'db_table_name')

export default  (async function (AppDataSource) {
    console.log("AppDataSource",AppDataSource)
    const dbRepository = AppDataSource.getRepository(Database)
    const tbTypeRepository = AppDataSource.getRepository(DatabaseTableType)
    const tbRepository = AppDataSource.getRepository(DatabaseTable)
    const colRepository = AppDataSource.getRepository(DataTableColumn)
    const orgRepository = AppDataSource.getRepository(Organization)
  const org = await orgRepository.create({
    organization_name: "Artelco",
    organization_description: ""
  })

  const orgInRes = await orgRepository
  .createQueryBuilder('org')
  .insert()
  .values([
    {
      ...org,
    },
  ])
  .execute()
const organization_id = orgInRes.raw[0].organization_id
  const database = await dbRepository.create({
    db_name: 'RTD',
    organization_id
  })

  const dbInRes = await dbRepository
    .createQueryBuilder('db')
    .insert()
    .values([
      {
        ...database,
      },
    ])
    .execute()
  const db_id = dbInRes.raw[0].db_id

  for (var e = 0; e < RTDTableTypes.length; e++) {
    const tableType = await tbTypeRepository.create({
      db_table_type_name: RTDTableTypes[e]['db_table_type_name'],
    })

    const tbTypeInRes = await tbTypeRepository
      .createQueryBuilder('tbType')
      .insert()
      .values([
        {
          ...tableType,
        },
      ])
      .execute()
    const table_type_id = tbTypeInRes.raw[0].db_table_type_id
    const targetTables = tables.filter((a) =>
      a.db_table_name
        .toLowerCase()
        .includes(RTDTableTypes[e]['db_table_type_name'].toLowerCase()),
    )
    for (var i = 0; i < targetTables.length; i++) {
      const table = await tbRepository.create({
        db_id,
        db_table_name: targetTables[i]['db_table_name'],
        db_table_type_id: table_type_id,
      })

      const tbInRes = await tbRepository
        .createQueryBuilder('tb')
        .insert()
        .values([
          {
            ...table,
          },
        ])
        .execute()
      const table_id = tbInRes.raw[0].db_table_id
      const columns = RTDTables.filter(
        (a) =>
          a.db_table_name === targetTables[i]['db_table_name'],
      )
      for (var j = 0; j < columns.length; j++) {
        const column = await colRepository.create({
          db_table_column_name: columns[j]['db_table_column_name'],
          db_table_column_type: columns[j]['db_table_column_type'],
          db_table_id: table_id,
        })

        const colInRes = await colRepository
          .createQueryBuilder('col')
          .insert()
          .values([
            {
              ...column,
            },
          ])
          .execute()
      }
    }
  }
})