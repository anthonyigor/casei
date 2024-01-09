import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1704748953608 implements MigrationInterface {
    name = 'Default1704748953608'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "convidados" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "quant_familia" integer NOT NULL, "confirmado" boolean NOT NULL, "presente" boolean NOT NULL, "user_id" integer, CONSTRAINT "PK_9d4371c510ecb9c9b00aa7361fa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "email" character varying NOT NULL, "nome_parceiro" character varying NOT NULL, "data_casamento" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "convidados" ADD CONSTRAINT "FK_9e1f9fe153572d04aa2c3a28a60" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "convidados" DROP CONSTRAINT "FK_9e1f9fe153572d04aa2c3a28a60"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "convidados"`);
    }

}
