import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Section } from './section.entity';

@Entity('manuals')
export class Manual {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @OneToMany(() => Section, section => section.manual, { cascade: true })
  sections: Section[];
}
