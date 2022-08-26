import { Role } from 'src/roles/role.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('movies')
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  imdbRating: string;

  @Column()
  year: number;

  @ManyToMany((type) => User, (user) => user.favouriteMovies, { cascade: true })
  usersFavourite: User[] | null;

  @ManyToMany((type) => User, (user) => user.watchedMovies, { cascade: true })
  usersWatched: User[] | null;
}
