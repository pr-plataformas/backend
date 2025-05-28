import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1748451484500 implements MigrationInterface {
    name = 'Migration1748451484500'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('estudiante', 'profesor', 'administrador')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "fullName" character varying NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT 'estudiante', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")); COMMENT ON COLUMN "user"."role" IS 'Rol del usuario'`);
        await queryRunner.query(`CREATE TABLE "videos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(255) NOT NULL, "description" text, "file_key" character varying(255) NOT NULL, "file_url" character varying(255) NOT NULL, "content_type" character varying(100) NOT NULL, "file_size" integer, "upload_duration" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_e4c86c0cf95aff16e9fb8220f6b" PRIMARY KEY ("id")); COMMENT ON COLUMN "videos"."title" IS 'Título del video'; COMMENT ON COLUMN "videos"."description" IS 'Descripción del video'; COMMENT ON COLUMN "videos"."file_key" IS 'Clave del archivo en S3'; COMMENT ON COLUMN "videos"."file_url" IS 'URL del archivo en S3'; COMMENT ON COLUMN "videos"."content_type" IS 'Tipo de contenido del archivo'; COMMENT ON COLUMN "videos"."file_size" IS 'Tamaño del archivo en bytes'; COMMENT ON COLUMN "videos"."upload_duration" IS 'Duración de la subida en segundos'; COMMENT ON COLUMN "videos"."created_at" IS 'Fecha de creación del registro'; COMMENT ON COLUMN "videos"."updated_at" IS 'Fecha de última actualización del registro'; COMMENT ON COLUMN "videos"."deleted_at" IS 'Fecha de eliminación del registro'`);
        await queryRunner.query(`CREATE TYPE "public"."blocks_type_enum" AS ENUM('text', 'video')`);
        await queryRunner.query(`CREATE TABLE "blocks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" "public"."blocks_type_enum" NOT NULL, "content" text NOT NULL, "order" integer NOT NULL, "subsectionId" uuid, CONSTRAINT "PK_8244fa1495c4e9222a01059244b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subsections" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "order" integer NOT NULL, "sectionId" uuid, CONSTRAINT "PK_1229930013cb47ceb1d98bccbc9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sections" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "order" integer NOT NULL, "manualId" uuid, CONSTRAINT "PK_f9749dd3bffd880a497d007e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "manuals" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, CONSTRAINT "PK_ff041e52910af133b601ce3c707" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "blocks" ADD CONSTRAINT "FK_8a335af50f72f3257532b0f80f5" FOREIGN KEY ("subsectionId") REFERENCES "subsections"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subsections" ADD CONSTRAINT "FK_93c2cb50e5efca783ba4dccaa0e" FOREIGN KEY ("sectionId") REFERENCES "sections"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sections" ADD CONSTRAINT "FK_b8c3c9258dcaf3a820ced880028" FOREIGN KEY ("manualId") REFERENCES "manuals"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sections" DROP CONSTRAINT "FK_b8c3c9258dcaf3a820ced880028"`);
        await queryRunner.query(`ALTER TABLE "subsections" DROP CONSTRAINT "FK_93c2cb50e5efca783ba4dccaa0e"`);
        await queryRunner.query(`ALTER TABLE "blocks" DROP CONSTRAINT "FK_8a335af50f72f3257532b0f80f5"`);
        await queryRunner.query(`DROP TABLE "manuals"`);
        await queryRunner.query(`DROP TABLE "sections"`);
        await queryRunner.query(`DROP TABLE "subsections"`);
        await queryRunner.query(`DROP TABLE "blocks"`);
        await queryRunner.query(`DROP TYPE "public"."blocks_type_enum"`);
        await queryRunner.query(`DROP TABLE "videos"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
    }

}
