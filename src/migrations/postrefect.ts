import { MigrationInterface, QueryRunner } from 'typeorm'
import { AppDataSource} from "src/data-source";
import RTDTables from 'src/data/RTDTables'
import RTDTableTypes from 'src/data/RTDTableTypes'
import { Organization } from 'src/entity/Organization'
import { Database } from 'src/entity/Database'
import { DatabaseTable } from 'src/entity/DatabaseTable'
import { DataTableColumn } from 'src/entity/DatabaseTableColumn'
import { DatabaseTableType } from '@artelco/entity/DatabaseTabletype'

export class postrefect1688980030985 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
   
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
   
  }
}
