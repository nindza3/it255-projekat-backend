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
import { Role } from 'src/roles/role.entity';
import { DeleteResult, Repository } from 'typeorm';
import { LoginUserDto, UserDto } from './user.dto';
import { User } from './user.entity';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  @Post()
  async createUser(@Body() userBody: UserDto): Promise<User> {
    let user = new User();
    user.name = userBody.name;
    user.email = userBody.email;
    user.password = userBody.password;
    user.favouriteMovies = [];
    user.watchedMovies = [];
    let role = await this.roleRepository.findOneBy({ roleName: 'client' });
    console.log(role);
    user.role = role;
    console.log(user);
    return await this.userRepository.save(user);
  }

  @Post('createAdmin')
  async createAdmin(@Body() userBody: UserDto): Promise<User> {
    let user = new User();
    user.name = userBody.name;
    user.email = userBody.email;
    user.password = userBody.password;
    user.favouriteMovies = [];
    user.watchedMovies = [];
    let role = await this.roleRepository.findOneBy({ roleName: 'admin' });
    console.log(role);
    user.role = role;
    console.log(user);
    return await this.userRepository.save(user);
  }

  @Post('login')
  async login(@Body() userBody: LoginUserDto): Promise<User> {
    let user = await this.userRepository.findOneBy({
      email: userBody.email,
      password: userBody.password,
    });
    let role = await this.roleRepository.findOneBy({ users: user });

    user.role = role;
    return user;
  }

  @ApiHeader({
    name: 'front-auth',
    required: true,
  })
  @Get('allClients')
  async getAllClients(@Req() request): Promise<User[]> {
    let authId = request.headers['front-auth'];

    if (authId == null) {
      throw new ForbiddenException('Auth id is required');
    } else {
      let role = await this.roleRepository.findOneBy({ roleName: 'admin' });
      let user = await this.userRepository.findOneBy({ id: authId });
      if (user.role.id !== role.id) {
        throw new ForbiddenException('User is not an Admin');
      }
    }

    let role = await this.roleRepository.findBy({ roleName: 'client' });
    let users = await this.userRepository.findBy({ role: role });

    return users;
  }
}
