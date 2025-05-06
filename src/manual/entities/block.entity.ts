import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Subsection } from './subsection.entity';

@Entity('blocks')
export class Block {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: ['text', 'video'],
  })
  type: 'text' | 'video';

  @Column('text')
  content: string;

  @Column()
  order: number;

  @ManyToOne(() => Subsection, (subsection) => subsection.blocks, {
    onDelete: 'CASCADE',
  })
  subsection: Subsection;
}
