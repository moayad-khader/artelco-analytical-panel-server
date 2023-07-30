import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn
} from 'typeorm'
import { constants } from '../constants'
import { DataTableColumn } from "./DatabaseTableColumn"

@Entity('artelco_analytical_panel_billboards', {
  database: constants.MAIN_DB,
})
export class Billboard {
  @PrimaryGeneratedColumn()
  billboard_id: number

  @Column()
  table_column_id: number

  @Column()
  billboard_title_en: string

  @Column()
  billboard_title_ar: string

  @Column()
  billboard_icon: string

  @Column()
  billboard_type: string

  @Column()
  billboard_metric_type: string

  @Column()
  billboard_threshold_warning: number

  @Column()
  billboard_threshold_danger: number

  @CreateDateColumn()
  public createdAt: Date

  @UpdateDateColumn()
  public updatedAt: Date

  @OneToOne(() => DataTableColumn, (dataTableColumn) => dataTableColumn.db_table_column_id)
  @JoinColumn({ name: 'db_table_column_id', referencedColumnName: 'db_table_column_id' })
  db_table_column: DataTableColumn
}
