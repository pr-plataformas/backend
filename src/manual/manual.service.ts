import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Manual } from './entities/manual.entity';
import { Section } from './entities/section.entity';
import { Subsection } from './entities/subsection.entity';
import { Block } from './entities/block.entity';
import { Repository } from 'typeorm';
import { CreateManualDto } from './dto/create-manual.dto';
import { CreateSectionDto } from './dto/create-section.dto';
import { CreateSubsectionDto } from './dto/create-subsection.dto';
import { CreateBlockDto } from './dto/create-block.dto';

@Injectable()
export class ManualService {
  [x: string]: any;
  constructor(
    @InjectRepository(Manual) private manualRepo: Repository<Manual>,
    @InjectRepository(Section) private sectionRepo: Repository<Section>,
    @InjectRepository(Subsection) private subsectionRepo: Repository<Subsection>,
    @InjectRepository(Block) private blockRepo: Repository<Block>,
  ) {}

  async createManual(dto: CreateManualDto) {
    const manual = this.manualRepo.create(dto);
    return this.manualRepo.save(manual);
  }

  async createSection(dto: CreateSectionDto) {
    const manual = await this.manualRepo.findOneBy({ id: dto.manualId });
    if (!manual) throw new NotFoundException('Manual not found');

    const section = this.sectionRepo.create({ title: dto.title, manual });
    return this.sectionRepo.save(section);
  }

  async createSubsection(dto: CreateSubsectionDto) {
    const section = await this.sectionRepo.findOneBy({ id: dto.sectionId });
    if (!section) throw new NotFoundException('Section not found');

    const subsection = this.subsectionRepo.create({ title: dto.title, section });
    return this.subsectionRepo.save(subsection);
  }

  async createBlock(dto: CreateBlockDto) {
    const subsection = await this.subsectionRepo.findOneBy({ id: dto.subsectionId });
    if (!subsection) throw new NotFoundException('Subsection not found');

    const block = this.blockRepo.create({ ...dto, subsection });
    return this.blockRepo.save(block);
  }

  async getAllManuals() {
    return this.manualRepo.find({
      relations: {
        sections: {
          subsections: {
            blocks: true,
          },
        },
      },
    });
  }
  async findOneManual(id: string) {
    return this.manualRepo.findOne({
      where: { id },
      relations: {
        sections: {
          subsections: {
            blocks: true,
          },
        },
      },
    });
  }
  
}
