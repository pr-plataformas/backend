import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1744749828659 implements MigrationInterface {
    name = 'Migration1744749828659'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(100) NOT NULL, "full_name" character varying(100) NOT NULL, "role" character varying NOT NULL DEFAULT 'user', "password" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_0adc0a8834ea0f252e96d154de9" UNIQUE ("full_name"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")); COMMENT ON COLUMN "users"."email" IS 'Email del usuario'; COMMENT ON COLUMN "users"."full_name" IS 'Nombre completo del usuario'; COMMENT ON COLUMN "users"."role" IS 'Rol del usuario'; COMMENT ON COLUMN "users"."password" IS 'Contraseña del usuario'; COMMENT ON COLUMN "users"."created_at" IS 'Fecha de creación del usuario'; COMMENT ON COLUMN "users"."updated_at" IS 'Fecha de última actualización del usuario'; COMMENT ON COLUMN "users"."deleted_at" IS 'Fecha de eliminación del usuario'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
