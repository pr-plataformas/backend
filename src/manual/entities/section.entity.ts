import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Manual } from './manual.entity';
import { Subsection } from './subsection.entity';

@Entity('sections')
export class Section {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  order: number;

  @ManyToOne(() => Manual, (manual) => manual.sections, { onDelete: 'CASCADE' })
  manual: Manual;

  @OneToMany(() => Subsection, (subsection) => subsection.section, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  subsections: Subsection[];
}
