import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/roles/role.entity';
import { User } from 'src/users/user.entity';
import { MovieController } from './movies.controller';
import { Movie } from './movies.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, User, Role])],
  controllers: [MovieController],
  exports: [TypeOrmModule],
})
export class MovieModule {}
