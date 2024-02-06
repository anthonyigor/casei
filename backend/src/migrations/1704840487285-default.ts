import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1704840487285 implements MigrationInterface {
    name = 'Default1704840487285'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "convidados" DROP COLUMN "presente"`);
        await queryRunner.query(`ALTER TABLE "convidados" ADD "presente" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "convidados" DROP COLUMN "presente"`);
        await queryRunner.query(`ALTER TABLE "convidados" ADD "presente" boolean NOT NULL`);
    }

}
