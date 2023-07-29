import { MigrationInterface, QueryRunner } from 'typeorm'

export class postrefect1688980030985 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('postrefect1688980030985')
    await queryRunner.query(`select 1`)
    await queryRunner.query(``)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`select 1`)
  }
}
