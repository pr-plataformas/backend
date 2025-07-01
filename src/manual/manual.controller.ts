import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BlockService } from './services/block.service';
import { CreateBlockDto } from './dto/create-block.dto';
import { CreateFullManualDto } from './dto/create-full-manual.dto';
import { CreateManualDto } from './dto/create-manual.dto';
import { CreateSectionDto } from './dto/create-section.dto';
import { CreateSubsectionDto } from './dto/create-subsection.dto';
import { ReorderBlocksDto } from './dto/reorder-blocks.dto';
import { ReorderSectionsDto } from './dto/reorder-sections.dto';
import { ReorderSubsectionsDto } from './dto/reorder-subsections.dto';
import { ManualService } from './services/manual.service';
import { SectionService } from './services/section.service';
import { SubsectionService } from './services/subsection.service';
import { ApiResponse } from 'src/common/types/ApiResponse.interface';
import { Manual } from './entities/manual.entity';

@UseGuards(JwtAuthGuard)
@Controller('manuals')
export class ManualController {
  constructor(
    private manualService: ManualService,
    private sectionService: SectionService,
    private subsectionService: SubsectionService,
    private blockService: BlockService,
  ) {}

  @Post()
  async createManual(
    @Body() dto: CreateManualDto,
  ): Promise<ApiResponse<Manual>> {
    try {
      const createdManual = await this.manualService.createManual(dto);
      return {
        statusCode: 201,
        message: 'Manual created successfully',
        data: createdManual,
      };
    } catch (error) {
      return {
        statusCode: error.statusCode || 500,
        message: error.message || 'Error creating manual',
        data: null,
      };
    }
  }

  @Post('section')
  async createSection(@Body() dto: CreateSectionDto) {
    try {
      const createdSection = await this.sectionService.createSection(dto);
      return {
        statusCode: 201,
        message: 'Section created successfully',
        data: createdSection,
      };
    } catch (error) {
      return {
        statusCode: error.statusCode || 500,
        message: error.message || 'Error creating section',
        data: null,
      };
    }
  }

  @Post('subsection')
  async createSubsection(@Body() dto: CreateSubsectionDto) {
    try {
      const createdSubsection =
        await this.subsectionService.createSubsection(dto);
      return {
        statusCode: 201,
        message: 'Subsection created successfully',
        data: createdSubsection,
      };
    } catch (error) {
      return {
        statusCode: error.statusCode || 500,
        message: error.message || 'Error creating subsection',
        data: null,
      };
    }
  }

  @Post('block')
  async createBlock(@Body() dto: CreateBlockDto) {
    try {
      const createdBlock = await this.blockService.createBlock(dto);
      return {
        statusCode: 201,
        message: 'Block created successfully',
        data: createdBlock,
      };
    } catch (error) {
      return {
        statusCode: error.statusCode || 500,
        message: error.message || 'Error creating block',
        data: null,
      };
    }
  }

  @Post('full')
  async createFullManual(@Body() dto: CreateFullManualDto) {
    try {
      const createdManual = await this.manualService.createFullManual(dto);
      return {
        statusCode: 201,
        message: 'Full manual created successfully',
        data: createdManual,
      };
    } catch (error) {
      return {
        statusCode: error.statusCode || 500,
        message: error.message || 'Error creating full manual',
        data: null,
      };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const manual = await this.manualService.findOne(id);
      if (!manual) {
        return {
          statusCode: 404,
          message: 'Manual not found',
          data: null,
        };
      }
      return {
        statusCode: 200,
        message: 'Manual retrieved successfully',
        data: manual,
      };
    } catch (error) {
      return {
        statusCode: error.statusCode || 500,
        message: error.message || 'Error retrieving manual',
        data: null,
      };
    }
  }

  @Get()
  async getAll() {
    return this.manualService.getAllManuals();
  }

  @Patch('block/reorder')
  async reorderBlocks(@Body() dto: ReorderBlocksDto) {
    try {
      const reorderedBlocks = await this.blockService.reorderBlocks(dto);
      return {
        statusCode: 200,
        message: 'Blocks reordered successfully',
        data: reorderedBlocks,
      };
    } catch (error) {
      return {
        statusCode: error.statusCode || 500,
        message: error.message || 'Error reordering blocks',
        data: null,
      };
    }
  }

  @Patch('section/reorder')
  async reorderSections(@Body() dto: ReorderSectionsDto) {
    try {
      const reorderedSections = await this.sectionService.reorderSections(dto);
      return {
        statusCode: 200,
        message: 'Sections reordered successfully',
        data: reorderedSections,
      };
    } catch (error) {
      return {
        statusCode: error.statusCode || 500,
        message: error.message || 'Error reordering sections',
        data: null,
      };
    }
  }

  @Patch('subsection/reorder')
  async reorderSubsections(@Body() dto: ReorderSubsectionsDto) {
    try {
      const reorderedSubsections =
        await this.subsectionService.reorderSubsections(dto);
      return {
        statusCode: 200,
        message: 'Subsections reordered successfully',
        data: reorderedSubsections,
      };
    } catch (error) {
      return {
        statusCode: error.statusCode || 500,
        message: error.message || 'Error reordering subsections',
        data: null,
      };
    }
  }
}
