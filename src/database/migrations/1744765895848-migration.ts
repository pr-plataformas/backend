import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1744765895848 implements MigrationInterface {
    name = 'Migration1744765895848'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "videos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(255) NOT NULL, "description" text, "file_key" character varying(255) NOT NULL, "file_url" character varying(255) NOT NULL, "content_type" character varying(100) NOT NULL, "file_size" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_e4c86c0cf95aff16e9fb8220f6b" PRIMARY KEY ("id")); COMMENT ON COLUMN "videos"."title" IS 'Título del video'; COMMENT ON COLUMN "videos"."description" IS 'Descripción del video'; COMMENT ON COLUMN "videos"."file_key" IS 'Clave del archivo en S3'; COMMENT ON COLUMN "videos"."file_url" IS 'URL del archivo en S3'; COMMENT ON COLUMN "videos"."content_type" IS 'Tipo de contenido del archivo'; COMMENT ON COLUMN "videos"."file_size" IS 'Tamaño del archivo en bytes'; COMMENT ON COLUMN "videos"."created_at" IS 'Fecha de creación del registro'; COMMENT ON COLUMN "videos"."updated_at" IS 'Fecha de última actualización del registro'; COMMENT ON COLUMN "videos"."deleted_at" IS 'Fecha de eliminación del registro'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "videos"`);
    }

}
