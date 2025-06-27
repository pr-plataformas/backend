import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Block } from '../entities/block.entity';
import { Subsection } from '../entities/subsection.entity';
import { CreateBlockDto } from '../dto/create-block.dto';
import { ReorderBlocksDto } from '../dto/reorder-blocks.dto';

@Injectable()
export class BlockService {
  constructor(
    @InjectRepository(Block) private blockRepo: Repository<Block>,
    @InjectRepository(Subsection)
    private subsectionRepo: Repository<Subsection>,
  ) {}

  async createBlock(dto: CreateBlockDto) {
    const subsection = await this.subsectionRepo.findOneBy({
      id: dto.subsectionId,
    });
    if (!subsection) throw new NotFoundException('Subsection not found');
    const block = this.blockRepo.create({ ...dto, subsection });
    return this.blockRepo.save(block);
  }

  async reorderBlocks(dto: ReorderBlocksDto) {
    const blocks = await this.blockRepo.find({
      where: { subsection: { id: dto.subsectionId } },
    });
    const blockMap = new Map(blocks.map((b) => [b.id, b]));
    for (const { id, order } of dto.blocks) {
      const block = blockMap.get(id);
      if (block) {
        block.order = order;
      }
    }
    await this.blockRepo.save(Array.from(blockMap.values()));
    const updatedBlocks = await this.blockRepo.find({
      where: { subsection: { id: dto.subsectionId } },
      order: { order: 'ASC' },
    });
    return updatedBlocks;
  }
}
