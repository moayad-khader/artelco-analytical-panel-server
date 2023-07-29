import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { constants } from '../constants'
import { DatabaseTable } from './DatabaseTable'
import { Organization } from './Organization'

@Entity('artelco_analytical_panel_databases', {
  database: constants.MAIN_DB,
})
export class Database {
  @PrimaryGeneratedColumn()
  db_id: number

  @Column()
  organization_id: number

  @Column()
  db_name: string

  @CreateDateColumn()
  public createdAt: Date

  @UpdateDateColumn()
  public updatedAt: Date

  @OneToMany(() => DatabaseTable, (databaseTable) => databaseTable.database)
  database: DatabaseTable[]

  @ManyToOne(() => Organization, (organization) => organization.organization_id)
  @JoinColumn({
    name: 'organization_id',
    referencedColumnName: 'organization_id',
  })
  organization: Organization
}
