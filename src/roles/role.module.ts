import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { RoleController } from './role.controller';
import { Role } from './role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, User])],
  controllers: [RoleController],
  exports: [TypeOrmModule],
})
export class RoleModule {}
