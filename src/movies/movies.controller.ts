import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Header,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/roles/role.entity';
import { User } from 'src/users/user.entity';
import { DeleteResult, Repository } from 'typeorm';
import { MysqlDataSource } from 'typeOrm.config';
import { AddToWatched, MovieDto, RemoveFromWatched } from './movies.dto';
import { Movie } from './movies.entity';

@ApiTags('movies')
@Controller('movies')
export class MovieController {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,

    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  @ApiHeader({
    name: 'front-auth',
    required: true,
  })
  @Post()
  async createMovie(
    @Body() movieBody: MovieDto,
    @Req() request,
  ): Promise<Movie> {
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

    let movie = new Movie();
    movie.name = movieBody.name;
    movie.imdbRating = movieBody.imdbRating;
    movie.year = movieBody.year;
    movie.usersFavourite = [];
    return await this.moviesRepository.save(movie);
  }

  @ApiHeader({
    name: 'front-auth',
    required: true,
  })
  @Delete(':id')
  async deleteMovie(
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

    return await this.moviesRepository.delete({});
  }

  @ApiHeader({
    name: 'front-auth',
    required: true,
  })
  @Patch(':id/addMovieToFavourites')
  async addMovieToFavourites(
    @Param('id') id: number,
    @Body() addToWatchedBody: AddToWatched,
    @Req() request,
  ): Promise<void> {
    let authId = request.headers['front-auth'];

    if (authId == null) {
      throw new ForbiddenException('Auth id is required');
    } else {
      let role = await this.rolesRepository.findOneBy({ roleName: 'client' });
      let user = await this.userRepository.findOneBy({ id: authId });
      if (user.role.id !== role.id) {
        throw new ForbiddenException('User is not an Client');
      }
    }

    let user = await this.userRepository.find({
      select: {
        id: true,
        name: true,
        password: true,
        role: {
          id: true,
          roleName: true,
        },
        favouriteMovies: true,
      },
      relations: {
        favouriteMovies: true,
      },
      where: {
        id: addToWatchedBody.userId,
      },
      take: 1,
    });
    let movie = await this.moviesRepository.findOneBy({ id });

    console.log(user);

    if (user[0].favouriteMovies != null) {
      user[0].favouriteMovies.push(movie);
    } else {
      user[0].favouriteMovies = [movie];
    }

    await this.userRepository.save(user);
  }

  @ApiHeader({
    name: 'front-auth',
    required: true,
  })
  @Patch(':id/removeMoviefromFavourites')
  async removeMovieFromFavourites(
    @Param('id') id: number,
    @Body() removeFromWatched: RemoveFromWatched,
    @Req() request,
  ): Promise<void> {
    let authId = request.headers['front-auth'];

    if (authId == null) {
      throw new ForbiddenException('Auth id is required');
    } else {
      let role = await this.rolesRepository.findOneBy({ roleName: 'client' });
      let user = await this.userRepository.findOneBy({ id: authId });
      if (user.role.id !== role.id) {
        throw new ForbiddenException('User is not an Client');
      }
    }

    let userList = await this.userRepository.find({
      select: {
        id: true,
        name: true,
        password: true,
        role: {
          id: true,
          roleName: true,
        },
        favouriteMovies: true,
      },
      relations: {
        favouriteMovies: true,
      },
      where: {
        id: removeFromWatched.userId,
      },
      take: 1,
    });

    let user = userList[0];
    if (user.favouriteMovies.length == 0) {
      throw new BadRequestException('Favourites are empty');
    }
    user.favouriteMovies = user.favouriteMovies.filter(
      (x) => x.id !== Number(id),
    );

    console.log(user.favouriteMovies);
    await this.userRepository.save(user);
  }

  @ApiHeader({
    name: 'front-auth',
    required: true,
  })
  @Patch(':id/addMovieToWatched')
  async addMovieToWatched(
    @Param('id') id: number,
    @Body() addToWatchedBody: AddToWatched,
    @Req() request,
  ): Promise<void> {
    let authId = request.headers['front-auth'];

    if (authId == null) {
      throw new ForbiddenException('Auth id is required');
    } else {
      let role = await this.rolesRepository.findOneBy({ roleName: 'client' });
      let user = await this.userRepository.findOneBy({ id: authId });
      if (user.role.id !== role.id) {
        throw new ForbiddenException('User is not an Client');
      }
    }

    let user = await this.userRepository.find({
      select: {
        id: true,
        name: true,
        password: true,
        role: {
          id: true,
          roleName: true,
        },
        favouriteMovies: true,
        watchedMovies: true,
      },
      relations: {
        favouriteMovies: true,
        watchedMovies: true,
      },
      where: {
        id: addToWatchedBody.userId,
      },
      take: 1,
    });
    let movie = await this.moviesRepository.findOneBy({ id });

    console.log(user);

    if (user[0].watchedMovies != null) {
      user[0].watchedMovies.push(movie);
    } else {
      user[0].watchedMovies = [movie];
    }

    await this.userRepository.save(user);
  }

  @ApiHeader({
    name: 'front-auth',
    required: true,
  })
  @Patch(':id/removeMoviefromWatched')
  async removeMovieFromWatched(
    @Param('id') id: number,
    @Body() removeFromWatched: RemoveFromWatched,
    @Req() request,
  ): Promise<void> {
    let authId = request.headers['front-auth'];

    if (authId == null) {
      throw new ForbiddenException('Auth id is required');
    } else {
      let role = await this.rolesRepository.findOneBy({ roleName: 'client' });
      let user = await this.userRepository.findOneBy({ id: authId });
      if (user.role.id !== role.id) {
        throw new ForbiddenException('User is not an Client');
      }
    }

    let userList = await this.userRepository.find({
      select: {
        id: true,
        name: true,
        password: true,
        role: {
          id: true,
          roleName: true,
        },
        favouriteMovies: true,
        watchedMovies: true,
      },
      relations: {
        favouriteMovies: true,
        watchedMovies: true,
      },
      where: {
        id: removeFromWatched.userId,
      },
      take: 1,
    });

    let user = userList[0];
    if (user.watchedMovies.length == 0) {
      throw new BadRequestException('Favourites are empty');
    }
    user.watchedMovies = user.watchedMovies.filter((x) => x.id !== Number(id));

    console.log(user.watchedMovies);
    await this.userRepository.save(user);
  }
}
