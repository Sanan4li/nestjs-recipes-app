import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/database/Category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDTO } from './dto/CreateCategory.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryEntity: Repository<Category>,
  ) {}

  async createCategory(body: CreateCategoryDTO) {
    const data = await this.categoryEntity.save(body);
    return data;
  }

  async getAllCategories() {
    const data = await this.categoryEntity.find({});
    if (!data) {
      throw new NotFoundException('Categories not found');
    }
    return data;
  }

  async getCategoryById(id: string) {
    const data = await this.categoryEntity.findOneBy({ id: Number(id) });
    if (!data) {
      throw new NotFoundException('Category not found');
    }
    return data;
  }

  async updateCategory(id: string, body: CreateCategoryDTO) {
    const data = await this.getCategoryById(id);
    if (!data) {
      throw new NotFoundException('Category not found');
    }
    const updatedData = { ...data, ...body };
    return await this.categoryEntity.save(updatedData);
  }
}
