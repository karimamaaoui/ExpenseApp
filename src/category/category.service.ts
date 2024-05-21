import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from './entities/category.entity';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService {

  constructor(@InjectModel(Category.name) private categoryModel: Model<CategoryDocument>){}

  create(category: Category) : Promise<Category>{
    return this.categoryModel.create(category)
  }


  findAll(): Promise<Category[]>{
    return this.categoryModel.find();
  }
  
  findOne(id: string) :Promise<Category> {
    return this.categoryModel.findById(id);
  }
  
  update(id: string, category: Category) : Promise<Category> {
    return this.categoryModel.findByIdAndUpdate(id,category);
  }
  
  remove(id: string) :Promise<Category>{
    return this.categoryModel.findByIdAndDelete(id);
  }
  
}
