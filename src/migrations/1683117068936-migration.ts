import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1683117068936 implements MigrationInterface {
    name = 'migration1683117068936'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "temporary_user" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "address" varchar,
                "signature" varchar,
                "email" varchar,
                "password" varchar,
                "name" varchar,
                "avatar" varchar,
                CONSTRAINT "UQ_8d8e27c13c0c87addadb1d8308b" UNIQUE ("address"),
                CONSTRAINT "UQ_ed766a9782779b8390a2a81f444" UNIQUE ("email")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_user"(
                    "id",
                    "address",
                    "signature",
                    "email",
                    "password",
                    "name",
                    "avatar"
                )
            SELECT "id",
                "address",
                "signature",
                "email",
                "password",
                "name",
                "avatar"
            FROM "user"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_user"
                RENAME TO "user"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
                RENAME TO "temporary_user"
        `);
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "address" varchar NOT NULL,
                "signature" varchar NOT NULL,
                "email" varchar NOT NULL,
                "password" varchar NOT NULL,
                "name" varchar NOT NULL,
                "avatar" varchar NOT NULL
            )
        `);
        await queryRunner.query(`
            INSERT INTO "user"(
                    "id",
                    "address",
                    "signature",
                    "email",
                    "password",
                    "name",
                    "avatar"
                )
            SELECT "id",
                "address",
                "signature",
                "email",
                "password",
                "name",
                "avatar"
            FROM "temporary_user"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_user"
        `);
    }

}
