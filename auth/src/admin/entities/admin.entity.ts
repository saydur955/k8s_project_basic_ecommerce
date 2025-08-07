import { Entity, PrimaryGeneratedColumn, Column, VersionColumn } from 'typeorm';

@Entity()
export class Admin {

  @PrimaryGeneratedColumn()
  id: number;

  @VersionColumn()
  version: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  profile_image: string;

}
