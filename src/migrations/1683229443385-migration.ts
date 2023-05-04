import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1683229443385 implements MigrationInterface {
    name = 'migration1683229443385'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "secret" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "message" varchar NOT NULL
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "sessions" (
                "id" varchar(44) PRIMARY KEY NOT NULL,
                "user_id" integer,
                "content" text NOT NULL,
                "flash" text NOT NULL,
                "updated_at" integer NOT NULL,
                "created_at" integer NOT NULL
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "address" varchar,
                "signature" varchar,
                CONSTRAINT "UQ_3122b4b8709577da50e89b68983" UNIQUE ("address")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            DROP TABLE "sessions"
        `);
        await queryRunner.query(`
            DROP TABLE "secret"
        `);
    }

}
