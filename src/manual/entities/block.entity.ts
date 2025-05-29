import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Subsection } from './subsection.entity';
import { BlockType } from '../enums/block-type.enum';

@Entity('blocks')
export class Block {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'block_type',
    type: 'enum',
    enum: BlockType,
    default: BlockType.TEXT,
    comment: 'Tipo de bloque del manual',
    transformer: {
      to: (value: BlockType) => value,
      from: (value: BlockType) => value,
    },
  })
  type: BlockType;

  @Column({
    name: 'content',
    type: 'text',
    comment: 'Contenido del bloque del manual',
    transformer: {
      to: (value: string) => value.trim(),
      from: (value: string) => value.trim(),
    },
  })
  content: string;

  @Column({
    name: 'order',
    type: 'int',
    nullable: true,
    comment: 'Orden del bloque dentro de la subsección del manual',
    transformer: {
      to: (value: number) => value,
      from: (value: number) => value,
    },
  })
  order: number;

  @ManyToOne(() => Subsection, (subsection) => subsection.blocks, {
    onDelete: 'CASCADE',
  })
  subsection: Subsection;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de creación del bloque',
  })
  createdAt: Date;

  @CreateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    comment: 'Fecha de última actualización del bloque',
  })
  updatedAt: Date;

  @CreateDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
    default: null,
    comment: 'Fecha de eliminación del bloque',
  })
  deletedAt: Date | null;
}
