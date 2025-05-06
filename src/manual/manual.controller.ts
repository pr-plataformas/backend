import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { ManualService } from './manual.service';
import { SectionService } from './section.service';
import { SubsectionService } from './subsection.service';
import { BlockService } from './block.service';
import { CreateManualDto } from './dto/create-manual.dto';
import { CreateSectionDto } from './dto/create-section.dto';
import { CreateSubsectionDto } from './dto/create-subsection.dto';
import { CreateBlockDto } from './dto/create-block.dto';
import { CreateFullManualDto } from './dto/create-full-manual.dto';
import { ReorderBlocksDto } from './dto/reorder-blocks.dto';
import { ReorderSectionsDto } from './dto/reorder-sections.dto';
import { ReorderSubsectionsDto } from './dto/reorder-subsections.dto';

@Controller('manuals')
export class ManualController {
  constructor(
    private manualService: ManualService,
    private sectionService: SectionService,
    private subsectionService: SubsectionService,
    private blockService: BlockService,
  ) {}

  @Post()
  createManual(@Body() dto: CreateManualDto) {
    return this.manualService.createManual(dto);
  }

  @Post('section')
  createSection(@Body() dto: CreateSectionDto) {
    return this.sectionService.createSection(dto);
  }

  @Post('subsection')
  createSubsection(@Body() dto: CreateSubsectionDto) {
    return this.subsectionService.createSubsection(dto);
  }

  @Post('block')
  createBlock(@Body() dto: CreateBlockDto) {
    return this.blockService.createBlock(dto);
  }

  @Post('full')
  createFullManual(@Body() dto: CreateFullManualDto) {
    return this.manualService.createFullManual(dto);
  }

  @Patch('block/reorder')
  reorderBlocks(@Body() dto: ReorderBlocksDto) {
    return this.blockService.reorderBlocks(dto);
  }

  @Patch('section/reorder')
  reorderSections(@Body() dto: ReorderSectionsDto) {
    return this.sectionService.reorderSections(dto);
  }

  @Patch('subsection/reorder')
  reorderSubsections(@Body() dto: ReorderSubsectionsDto) {
    return this.subsectionService.reorderSubsections(dto);
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.manualService.findOneManual(id);
  }

  @Get()
  getAll() {
    return this.manualService.getAllManuals();
  }
}
