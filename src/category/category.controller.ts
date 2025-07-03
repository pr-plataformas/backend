import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiResponse } from 'src/common/types/ApiResponse.interface';

@UseGuards(JwtAuthGuard)
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
<<<<<<< HEAD
  async findAll(): Promise<ApiResponse<any[]>> {
    try {
      const categories = await this.categoryService.findAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'Categories retrieved successfully',
        data: categories,
      };
    } catch (error) {
      return {
        statusCode: error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message || 'Error retrieving categories',
        data: null,
      };
    }
=======
  async findAll() {
    const categories = await this.categoryService.findAll();
    return {
      data: categories,
      meta: {
        total: categories.length,
        timestamp: new Date().toISOString(),
        description: 'Categorías disponibles para organizar contenido educativo',
      },
    };
  }

  @Get('with-stats')
  async getCategoriesWithStats() {
    const categories = await this.categoryService.findAll();
    // Note: This would need implementation in the service to count related content
    return {
      data: categories.map((category) => ({
        ...category,
        contentCount: {
          manuals: 0, // Would be populated by service
          videos: 0, // Would be populated by service
        },
      })),
      meta: {
        total: categories.length,
        timestamp: new Date().toISOString(),
        description: 'Categorías con estadísticas de contenido asociado',
      },
    };
>>>>>>> 95cbfbb9b490ec5e9ddb509fa33ba2aa670785df
  }

  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<ApiResponse<any>> {
    try {
      const newCategory = await this.categoryService.create(createCategoryDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Category created successfully',
        data: newCategory,
      };
    } catch (error) {
      return {
        statusCode: error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message || 'Error creating category',
        data: null,
      };
    }
  }
}
