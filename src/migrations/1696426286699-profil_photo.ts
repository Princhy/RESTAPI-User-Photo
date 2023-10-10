import { MigrationInterface, QueryRunner } from "typeorm";

export class ProfilPhoto1696426286699 implements MigrationInterface {
    name = 'ProfilPhoto1696426286699'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`photo\` ADD \`profil\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`photo\` DROP COLUMN \`profil\``);
    }

}
