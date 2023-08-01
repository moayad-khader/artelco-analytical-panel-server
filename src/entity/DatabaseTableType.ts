import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm'
import { constants } from '../constants'
import { DatabaseTable } from './DatabaseTable'



//SECTION - Types: IVR, Agents, Skillset, ...etc.

@Entity('artelco_analytical_panel_database_tables_types', {
  database: constants.MAIN_DB,
})
export class DatabaseTableType {
  @PrimaryGeneratedColumn()
  db_table_type_id: number

  @Column()
  db_table_type_name: string

  @CreateDateColumn()
  public createdAt: Date

  @UpdateDateColumn()
  public updatedAt: Date

  @OneToMany(() => DatabaseTable, (databaseTable) => databaseTable.db_table_type)
  db_table: DatabaseTable[]

}
