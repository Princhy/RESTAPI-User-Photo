import { MigrationInterface, QueryRunner } from "typeorm";

export class UrlLength1695277628734 implements MigrationInterface {
    name = 'UrlLength1695277628734'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`photo\` DROP COLUMN \`url\``);
        await queryRunner.query(`ALTER TABLE \`photo\` ADD \`url\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`photo\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`photo\` ADD \`description\` varchar(50) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`photo\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`photo\` ADD \`description\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`photo\` DROP COLUMN \`url\``);
        await queryRunner.query(`ALTER TABLE \`photo\` ADD \`url\` varchar(30) NOT NULL`);
    }

}
