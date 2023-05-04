import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1683202227476 implements MigrationInterface {
    name = 'migration1683202227476'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "temporary_user" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "address" varchar,
                "signature" varchar,
                CONSTRAINT "UQ_8d8e27c13c0c87addadb1d8308b" UNIQUE ("address")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_user"("id", "address", "signature")
            SELECT "id",
                "address",
                "signature"
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
                "address" varchar,
                "signature" varchar,
                "email" varchar,
                "password" varchar,
                "name" varchar,
                "avatar" varchar,
                CONSTRAINT "UQ_ed766a9782779b8390a2a81f444" UNIQUE ("email"),
                CONSTRAINT "UQ_8d8e27c13c0c87addadb1d8308b" UNIQUE ("address")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "user"("id", "address", "signature")
            SELECT "id",
                "address",
                "signature"
            FROM "temporary_user"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_user"
        `);
    }

}
