import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { DeleteResult, Repository } from 'typeorm';
import { RoleDto } from './role.dto';
import { Role } from './role.entity';

@ApiTags('roles')
@Controller('roles')
export class RoleController {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  @ApiHeader({
    name: 'front-auth',
    required: true,
  })
  @Post()
  async createRole(@Body() roleBody: RoleDto, @Req() request): Promise<Role> {
    let authId = request.headers['front-auth'];

    if (authId == null) {
      throw new ForbiddenException('Auth id is required');
    } else {
      let role = await this.rolesRepository.findOneBy({ roleName: 'admin' });
      let user = await this.userRepository.findOneBy({ id: authId });

      if (user.role.id !== role.id) {
        throw new ForbiddenException('User is not an Admin');
      }
    }

    let role = new Role();
    role.roleName = roleBody.roleName;
    return await this.rolesRepository.save(role);
  }

  @ApiHeader({
    name: 'front-auth',
    required: true,
  })
  @Get()
  async getAllRoles(@Req() request): Promise<Role[]> {
    let authId = request.headers['front-auth'];

    if (authId == null) {
      throw new ForbiddenException('Auth id is required');
    } else {
      let role = await this.rolesRepository.findOneBy({ roleName: 'admin' });
      let user = await this.userRepository.findOneBy({ id: authId });

      if (user.role.id !== role.id) {
        throw new ForbiddenException('User is not an Admin');
      }
    }

    return await this.rolesRepository.find();
  }

  @ApiHeader({
    name: 'front-auth',
    required: true,
  })
  @Get(':id')
  async getRoleById(@Param('id') id: number, @Req() request): Promise<Role> {
    let authId = request.headers['front-auth'];

    if (authId == null) {
      throw new ForbiddenException('Auth id is required');
    } else {
      let role = await this.rolesRepository.findOneBy({ roleName: 'admin' });
      let user = await this.userRepository.findOneBy({ id: authId });
      if (user.role.id !== role.id) {
        throw new ForbiddenException('User is not an Admin');
      }
    }

    return await this.rolesRepository.findOneBy({ id });
  }

  @ApiHeader({
    name: 'front-auth',
    required: true,
  })
  @Patch(':id')
  async updateRoleName(
    @Param('id') id: number,
    @Body() roleBody: RoleDto,
    @Req() request,
  ): Promise<Role> {
    let authId = request.headers['front-auth'];

    if (authId == null) {
      throw new ForbiddenException('Auth id is required');
    } else {
      let role = await this.rolesRepository.findOneBy({ roleName: 'admin' });
      let user = await this.userRepository.findOneBy({ id: authId });
      if (user.role.id !== role.id) {
        throw new ForbiddenException('User is not an Admin');
      }
    }

    let role = await this.rolesRepository.findOneBy({ id });
    role.roleName = roleBody.roleName;
    return await this.rolesRepository.save(role);
  }

  @ApiHeader({
    name: 'front-auth',
    required: true,
  })
  @Delete(':id')
  async deleteRoleById(
    @Param('id') id: number,
    @Req() request,
  ): Promise<DeleteResult> {
    let authId = request.headers['front-auth'];

    if (authId == null) {
      throw new ForbiddenException('Auth id is required');
    } else {
      let role = await this.rolesRepository.findOneBy({ roleName: 'admin' });
      let user = await this.userRepository.findOneBy({ id: authId });
      if (user.role.id !== role.id) {
        throw new ForbiddenException('User is not an Admin');
      }
    }

    return await this.rolesRepository.delete({ id });
  }
}
