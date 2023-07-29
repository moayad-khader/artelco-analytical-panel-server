import { Transform } from 'class-transformer'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn
} from 'typeorm'
import { Organization } from './Organization'
import { constants } from '../constants'


@Entity(
  'artelco_analytical_panel_users',
  {
    database: constants.MAIN_DB
  }
)
export class User {
  @PrimaryGeneratedColumn()
  user_id: number

  @Column()
  organization_id: number

  @PrimaryColumn()
  @Transform(({ value }) => value.toLowerCase())
  user_name: string


  @Column()
  salt: string

  @Column({ length: 1024 })
  hash: string

  @CreateDateColumn()
  public createdAt: Date

  @UpdateDateColumn()
  public updatedAt: Date

  @ManyToOne(() => Organization, (organization) => organization.organization_id)
  @JoinColumn({ name: 'organization_id', referencedColumnName: 'organization_id' })
  organization: Organization

}
