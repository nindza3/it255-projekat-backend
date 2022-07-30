import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { Role } from 'src/roles/role.entity';

export const MysqlDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'S3cret',
  database: 'projekat-backend',
  entities: ['dist/**/*.entity.js'],
  synchronize: false,
  migrationsRun: false,
  migrations: ['dist/**/migrations/*.js'],
});
