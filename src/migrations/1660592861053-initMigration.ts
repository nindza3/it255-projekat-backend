import { MigrationInterface, QueryRunner } from 'typeorm';

export class initMigration1660592861053 implements MigrationInterface {
  name = 'initMigration1660592861053';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`role\` (\`id\` int NOT NULL AUTO_INCREMENT, \`roleName\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`roleId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`movies\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`imdbRating\` varchar(255) NOT NULL, \`year\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`users_favourite_movies_movies\` (\`usersId\` int NOT NULL, \`moviesId\` int NOT NULL, INDEX \`IDX_3e67853bab307e229abc970c35\` (\`usersId\`), INDEX \`IDX_3eedfbdaf7b1897b60d9ca3602\` (\`moviesId\`), PRIMARY KEY (\`usersId\`, \`moviesId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`users_watched_movies_movies\` (\`usersId\` int NOT NULL, \`moviesId\` int NOT NULL, INDEX \`IDX_e0e4f51ab0c20439a5aa13615e\` (\`usersId\`), INDEX \`IDX_9285e3988b501579204e8942b8\` (\`moviesId\`), PRIMARY KEY (\`usersId\`, \`moviesId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD CONSTRAINT \`FK_368e146b785b574f42ae9e53d5e\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_favourite_movies_movies\` ADD CONSTRAINT \`FK_3e67853bab307e229abc970c353\` FOREIGN KEY (\`usersId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_favourite_movies_movies\` ADD CONSTRAINT \`FK_3eedfbdaf7b1897b60d9ca3602d\` FOREIGN KEY (\`moviesId\`) REFERENCES \`movies\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_watched_movies_movies\` ADD CONSTRAINT \`FK_e0e4f51ab0c20439a5aa13615e8\` FOREIGN KEY (\`usersId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_watched_movies_movies\` ADD CONSTRAINT \`FK_9285e3988b501579204e8942b8b\` FOREIGN KEY (\`moviesId\`) REFERENCES \`movies\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users_watched_movies_movies\` DROP FOREIGN KEY \`FK_9285e3988b501579204e8942b8b\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_watched_movies_movies\` DROP FOREIGN KEY \`FK_e0e4f51ab0c20439a5aa13615e8\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_favourite_movies_movies\` DROP FOREIGN KEY \`FK_3eedfbdaf7b1897b60d9ca3602d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_favourite_movies_movies\` DROP FOREIGN KEY \`FK_3e67853bab307e229abc970c353\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_368e146b785b574f42ae9e53d5e\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_9285e3988b501579204e8942b8\` ON \`users_watched_movies_movies\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_e0e4f51ab0c20439a5aa13615e\` ON \`users_watched_movies_movies\``,
    );
    await queryRunner.query(`DROP TABLE \`users_watched_movies_movies\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_3eedfbdaf7b1897b60d9ca3602\` ON \`users_favourite_movies_movies\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_3e67853bab307e229abc970c35\` ON \`users_favourite_movies_movies\``,
    );
    await queryRunner.query(`DROP TABLE \`users_favourite_movies_movies\``);
    await queryRunner.query(`DROP TABLE \`movies\``);
    await queryRunner.query(`DROP TABLE \`users\``);
    await queryRunner.query(`DROP TABLE \`role\``);
  }
}
