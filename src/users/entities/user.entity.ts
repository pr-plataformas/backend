import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 100,
    nullable: false,
    unique: true,
    comment: 'Email del usuario',
  })
  email: string;

  @Column({
    name: 'full_name',
    type: 'varchar',
    length: 100,
    nullable: false,
    unique: true,
    comment: 'Nombre completo del usuario',
  })
  fullName: string;

  @Column({
    name: 'role',
    enum: ['admin', 'user'],
    type: 'varchar',
    nullable: false,
    default: 'user',
    comment: 'Rol del usuario',
  })
  role: string;

  @Column({
    name: 'password',
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: 'Contraseña del usuario',
  })
  password: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de creación del usuario',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    comment: 'Fecha de última actualización del usuario',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
    default: null,
    comment: 'Fecha de eliminación del usuario',
  })
  deletedAt: Date;
}
