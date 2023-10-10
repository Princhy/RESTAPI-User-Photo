import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeUserLength1694762929269 implements MigrationInterface {
    name = 'ChangeUserLength1694762929269'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`first_ame\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`first_ame\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`last_name\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`last_name\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`email\` varchar(20) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`last_name\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`last_name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`first_ame\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`first_ame\` varchar(255) NOT NULL`);
    }

}
