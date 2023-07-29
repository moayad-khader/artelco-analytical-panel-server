import { Transform } from 'class-transformer'
import { IsEmail, IsPhoneNumber } from 'class-validator'
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
import { User } from './User'
import constants from '../constants'
import { Database } from './Database'

@Entity('artelco_analytical_panel_organization', {
  database: constants.MAIN_DB,
})
export class Organization {
  @PrimaryGeneratedColumn()
  organization_id: number

  @Column()
  organization_name: string

  @Column()
  organization_description: string

  @CreateDateColumn()
  public createdAt: Date

  @UpdateDateColumn()
  public updatedAt: Date

  @OneToMany(() => User, (user) => user.organization)
  User: User[]

  @OneToMany(() => Database, (database) => database.organization)
  database: Database[]
}
