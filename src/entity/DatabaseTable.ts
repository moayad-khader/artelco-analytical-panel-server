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
import { DataTableColumn } from "./DatabaseTableColumn"
import { DatabaseTableType } from "./DatabaseTabletype";

@Entity('artelco_analytical_panel_database_tables', {
  database: constants.MAIN_DB,
})
export class DatabaseTable {
  @PrimaryGeneratedColumn()
  db_table_id: number

  @Column()
  db_id: number

  @Column()
  db_table_type_id: number

  @Column()
  db_table_name: string

  @CreateDateColumn()
  public createdAt: Date

  @UpdateDateColumn()
  public updatedAt: Date

  @ManyToOne(() => Database, (database) => database.db_id)
  @JoinColumn({ name: 'db_id', referencedColumnName: 'db_id' })
  database: Database

  @ManyToOne(() => DatabaseTableType, (databaseTableType) => databaseTableType.db_table_type_id)
  @JoinColumn({ name: 'db_table_type_id', referencedColumnName: 'db_table_type_id' })
  db_table_type: DatabaseTableType

  @OneToMany(() => DataTableColumn, (dataTableColumn) => dataTableColumn.db_table)
  db_table_column: DataTableColumn[]

}
