import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1745352753398 implements MigrationInterface {
    name = 'Migration1745352753398'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "videos" ADD "upload_duration" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`COMMENT ON COLUMN "videos"."upload_duration" IS 'Duración de la subida en segundos'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "videos"."upload_duration" IS 'Duración de la subida en segundos'`);
        await queryRunner.query(`ALTER TABLE "videos" DROP COLUMN "upload_duration"`);
    }

}
