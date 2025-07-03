import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
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
  }

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }
}
