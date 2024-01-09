import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1704842863256 implements MigrationInterface {
    name = 'Default1704842863256'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "convidados" ADD "telefone" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "convidados" DROP COLUMN "telefone"`);
    }

}
