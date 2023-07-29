import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { constants } from '../constants'
import { DatabaseTable } from './DatabaseTable'

@Entity('artelco_analytical_panel_database_tables_columns', {
  database: constants.MAIN_DB,
})
export class TableColumn {
  @PrimaryGeneratedColumn()
  table_column_id: number

  @Column()
  db_table_id: number

  @Column()
  table_column_name: string

  @CreateDateColumn()
  public createdAt: Date

  @UpdateDateColumn()
  public updatedAt: Date

  @ManyToOne(() => DatabaseTable, (databaseTable) => databaseTable.db_table_id)
  @JoinColumn({ name: 'db_table_id', referencedColumnName: 'db_table_id' })
  database_table: DatabaseTable
}
