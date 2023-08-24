import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm'
import { constants } from '../constants'
import { DataTableColumn } from './DatabaseTableColumn'
import { DatabaseTableFilter } from './DatabaseTableFilter'
@Entity('artelco_analytical_panel_billboards', {
  database: constants.MAIN_DB,
})
export class Chart {
  @PrimaryGeneratedColumn()
  chart_id: number

  @Column()
  db_table_column_id: number

  @Column()
  db_table_filter_id: number

  @Column()
  chart_title_ar: string

  @Column()
  chart_title_en: string

  @Column()
  chart_type: string

  @Column()
  chart_dependency: string // NOTE - Filter based or Column Based

  // @Column()
  // chart_theme: string

  @CreateDateColumn()
  public createdAt: Date

  @UpdateDateColumn()
  public updatedAt: Date

  @OneToOne(
    () => DataTableColumn,
    (dataTableColumn) => dataTableColumn.db_table_column_id,
  )
  @JoinColumn({
    name: 'db_table_column_id',
    referencedColumnName: 'db_table_column_id',
  })
  db_table_column: DataTableColumn

  @OneToOne(
    () => DatabaseTableFilter,
    (databaseTableFilter) => databaseTableFilter.db_table_filter_id,
  )
  @JoinColumn({
    name: 'db_table_filter_id',
    referencedColumnName: 'db_table_filter_id',
  })
  db_table_filter: DatabaseTableFilter
}
