import { Movie } from 'src/movies/movies.entity';
import { Role } from 'src/roles/role.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @ManyToOne((type) => Role, (role) => role.id, { eager: true })
  @JoinColumn()
  role: Role;

  @ManyToMany((type) => Movie, (movie) => movie.usersFavourite, {
    cascade: true,
  })
  @JoinTable()
  favouriteMovies: Movie[] | null;

  @ManyToMany((type) => Movie, (movie) => movie.usersWatched, {
    cascade: true,
  })
  @JoinTable()
  watchedMovies: Movie[] | null;
}
