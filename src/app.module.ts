import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MysqlDataSource } from 'typeOrm.config';

@Module({
  imports: [TypeOrmModule.forRoot(MysqlDataSource.options)],
  controllers: [],
  providers: [],
})
export class AppModule {}
