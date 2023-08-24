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
import { DatabaseTable } from './DatabaseTable'

@Entity('artelco_analytical_panel_tabulars', {
  database: constants.MAIN_DB,
})
export class Tabular {
  @PrimaryGeneratedColumn()
  tabular_id: number

  @Column()
  db_table_id: number

  @Column()
  tabular_title_ar: string

  @Column()
  tabular_title_en: string

  @CreateDateColumn()
  public createdAt: Date

  @UpdateDateColumn()
  public updatedAt: Date

  @OneToOne(() => DatabaseTable, (databaseTable) => databaseTable.db_table_id)
  @JoinColumn({
    name: 'db_table_id',
    referencedColumnName: 'db_table_id',
  })
  db_table: DatabaseTable
}
