import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MysqlDataSource } from 'typeOrm.config';
import { MovieModule } from './movies/movies.module';
import { RoleModule } from './roles/role.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(MysqlDataSource.options),
    RoleModule,
    UserModule,
    MovieModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
