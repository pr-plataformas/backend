import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1744942087859 implements MigrationInterface {
    name = 'Migration1744942087859'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "videos" ADD "category_id" uuid`);
        await queryRunner.query(`COMMENT ON COLUMN "videos"."category_id" IS 'ID de la categoría asociada'`);
        await queryRunner.query(`ALTER TABLE "videos" ADD CONSTRAINT "FK_f9fe0463a9fa4899f41ab736511" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "videos" DROP CONSTRAINT "FK_f9fe0463a9fa4899f41ab736511"`);
        await queryRunner.query(`COMMENT ON COLUMN "videos"."category_id" IS 'ID de la categoría asociada'`);
        await queryRunner.query(`ALTER TABLE "videos" DROP COLUMN "category_id"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
