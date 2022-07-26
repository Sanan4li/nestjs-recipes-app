import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDTO } from './dto/CreateCategory.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getAllCategories() {
    return this.categoryService.getAllCategories();
  }

  @Get(':id')
  getCategoryById(@Param('id') id: string) {
    return this.categoryService.getCategoryById(id);
  }

  @Post()
  createCategory(@Body() body: CreateCategoryDTO) {
    return this.categoryService.createCategory(body);
  }

  @Put(':id')
  updateCategory(@Param('id') id: string, @Body() body: CreateCategoryDTO) {
    return this.categoryService.updateCategory(id, body);
  }
}
