import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const MysqlDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'S3cret',
  database: 'projekat-backend',
  entities: ['dist/**/*.entity.js'],
  //entities: [Role, User],
  synchronize: true,
  migrationsRun: false,
  migrations: ['dist/**/migrations/*.js'],
});
