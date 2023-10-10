import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1694760700869 implements MigrationInterface {
    name = 'FirstMigration1694760700869'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`project\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`descri\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`first_ame\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`photo\` (\`id\` int NOT NULL AUTO_INCREMENT, \`url\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_project_project\` (\`userId\` int NOT NULL, \`projectId\` int NOT NULL, INDEX \`IDX_a8ad6ee911bc41cfaf83700f7f\` (\`userId\`), INDEX \`IDX_4d6244d2a2ecddb7cfe09a9d2c\` (\`projectId\`), PRIMARY KEY (\`userId\`, \`projectId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`photo\` ADD CONSTRAINT \`FK_4494006ff358f754d07df5ccc87\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_project_project\` ADD CONSTRAINT \`FK_a8ad6ee911bc41cfaf83700f7f4\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_project_project\` ADD CONSTRAINT \`FK_4d6244d2a2ecddb7cfe09a9d2cf\` FOREIGN KEY (\`projectId\`) REFERENCES \`project\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_project_project\` DROP FOREIGN KEY \`FK_4d6244d2a2ecddb7cfe09a9d2cf\``);
        await queryRunner.query(`ALTER TABLE \`user_project_project\` DROP FOREIGN KEY \`FK_a8ad6ee911bc41cfaf83700f7f4\``);
        await queryRunner.query(`ALTER TABLE \`photo\` DROP FOREIGN KEY \`FK_4494006ff358f754d07df5ccc87\``);
        await queryRunner.query(`DROP INDEX \`IDX_4d6244d2a2ecddb7cfe09a9d2c\` ON \`user_project_project\``);
        await queryRunner.query(`DROP INDEX \`IDX_a8ad6ee911bc41cfaf83700f7f\` ON \`user_project_project\``);
        await queryRunner.query(`DROP TABLE \`user_project_project\``);
        await queryRunner.query(`DROP TABLE \`photo\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`project\``);
    }

}
