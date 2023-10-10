import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeUserName1694784883112 implements MigrationInterface {
    name = 'ChangeUserName1694784883112'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`first_ame\` \`first_name\` varchar(50) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`first_name\` \`first_ame\` varchar(50) NOT NULL`);
    }

}
