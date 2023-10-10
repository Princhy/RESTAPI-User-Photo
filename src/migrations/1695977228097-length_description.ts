import { MigrationInterface, QueryRunner } from "typeorm";

export class LengthDescription1695977228097 implements MigrationInterface {
    name = 'LengthDescription1695977228097'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`photo\` MODIFY \`description\` varchar(250) NOT NULL`);
    }
    
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`photo\` MODIFY \`description\` varchar(50) NOT NULL`);
    }
}
