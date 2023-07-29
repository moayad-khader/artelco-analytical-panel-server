import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany
} from 'typeorm'
import { constants } from '../constants'
import { Database } from "./Database";
import { TableColumn } from "./TableColumn"

@Entity('artelco_analytical_panel_database_tables', {
  database: constants.MAIN_DB,
})
export class DatabaseTable {
  @PrimaryGeneratedColumn()
  db_table_id: number

  @Column()
  db_table_name: string

  @CreateDateColumn()
  public createdAt: Date

  @UpdateDateColumn()
  public updatedAt: Date

  @ManyToOne(() => Database, (database) => database.db_id)
  @JoinColumn({ name: 'db_id', referencedColumnName: 'db_id' })
  database: Database

  @OneToMany(() => TableColumn, (tableColumn) => tableColumn.database_table)
  table_column: TableColumn[]

}
