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
  
    @ManyToOne(() => Manual, manual => manual.sections, { onDelete: 'CASCADE' })
    manual: Manual;
  
    @OneToMany(() => Subsection, subsection => subsection.section, { cascade: true })
    subsections: Subsection[];
  }
  