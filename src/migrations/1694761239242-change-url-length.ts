import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeUrlLength1694761239242 implements MigrationInterface {
    name = 'ChangeUrlLength1694761239242'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`photo\` DROP COLUMN \`url\``);
        await queryRunner.query(`ALTER TABLE \`photo\` ADD \`url\` varchar(30) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`photo\` DROP COLUMN \`url\``);
        await queryRunner.query(`ALTER TABLE \`photo\` ADD \`url\` varchar(255) NOT NULL`);
    }

}
