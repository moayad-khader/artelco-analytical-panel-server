import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn
} from 'typeorm'
import { constants } from '../constants'
import { DatabaseTableType } from './DatabaseTabletype'

@Entity('artelco_analytical_panel_database_tables_filters', {
  database: constants.MAIN_DB,
})
export class DatabaseTableFilter {
  @PrimaryGeneratedColumn()
  db_table_filter_id: number

  @Column()
  db_table_filter_name: string

  @Column()
  db_table_filter_corr_id: number

  @CreateDateColumn()
  public createdAt: Date

  @UpdateDateColumn()
  public updatedAt: Date

  @ManyToOne(() => DatabaseTableType, (databaseTableType) => databaseTableType.db_table_type_id)
  @JoinColumn({ name: 'db_table_type_id', referencedColumnName: 'db_table_type_id' })
  db_table_type: DatabaseTableType
}
