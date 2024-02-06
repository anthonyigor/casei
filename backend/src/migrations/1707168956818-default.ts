import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1707168956818 implements MigrationInterface {
    name = 'Default1707168956818'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "presentes" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "descricao" character varying NOT NULL, "selecionado" boolean NOT NULL, "convidado_id" integer, CONSTRAINT "PK_d310ab23bb29c8eabbbdca58a91" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "convidados" DROP COLUMN "presente"`);
        await queryRunner.query(`ALTER TABLE "presentes" ADD CONSTRAINT "FK_2a3526f6a957b9e8fb339d243f2" FOREIGN KEY ("convidado_id") REFERENCES "convidados"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "presentes" DROP CONSTRAINT "FK_2a3526f6a957b9e8fb339d243f2"`);
        await queryRunner.query(`ALTER TABLE "convidados" ADD "presente" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "presentes"`);
    }

}
