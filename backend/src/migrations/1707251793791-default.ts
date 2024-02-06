import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1707251793791 implements MigrationInterface {
    name = 'Default1707251793791'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "presentes" ADD "user_id" integer`);
        await queryRunner.query(`ALTER TABLE "presentes" ADD CONSTRAINT "FK_111b1bbce9df47c033230e23ac6" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "presentes" DROP CONSTRAINT "FK_111b1bbce9df47c033230e23ac6"`);
        await queryRunner.query(`ALTER TABLE "presentes" DROP COLUMN "user_id"`);
    }

}
