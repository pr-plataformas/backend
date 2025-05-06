import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ManualService } from './manual.service';
import { CreateManualDto } from './dto/create-manual.dto';
import { CreateSectionDto } from './dto/create-section.dto';
import { CreateSubsectionDto } from './dto/create-subsection.dto';
import { CreateBlockDto } from './dto/create-block.dto';

@Controller('manuals')
export class ManualController {
  constructor(private manualService: ManualService) {}

  @Post()
  createManual(@Body() dto: CreateManualDto) {
    return this.manualService.createManual(dto);
  }

  @Post('section')
  createSection(@Body() dto: CreateSectionDto) {
    return this.manualService.createSection(dto);
  }

  @Post('subsection')
  createSubsection(@Body() dto: CreateSubsectionDto) {
    return this.manualService.createSubsection(dto);
  }

  @Post('block')
  createBlock(@Body() dto: CreateBlockDto) {
    return this.manualService.createBlock(dto);
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
