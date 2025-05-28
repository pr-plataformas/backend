import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  fullName: string;

  @Column({
    type: 'varchar',
    enum: ['admin', 'user'],
    default: 'user',
    nullable: false,
    comment: 'Rol del usuario',
  })
  role: string;
}
