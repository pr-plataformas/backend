import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
  } from 'typeorm';
  import { Section } from './section.entity';
  import { Block } from './block.entity';
  
  @Entity('subsections')
  export class Subsection {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    title: string;
  
    @ManyToOne(() => Section, section => section.subsections, { onDelete: 'CASCADE' })
    section: Section;
  
    @OneToMany(() => Block, block => block.subsection, { cascade: true })
    blocks: Block[];
  }
  