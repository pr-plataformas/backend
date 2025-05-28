import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '../../common/enums/user-role.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  fullName: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.ESTUDIANTE,
    nullable: false,
    comment: 'Rol del usuario',
  })
  role: UserRole;
}
