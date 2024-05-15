import { Injectable } from '@nestjs/common';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Budget, BudgetDocument } from './entities/budget.entity';
import { Model } from 'mongoose';

@Injectable()
export class BudgetService {
  constructor(@InjectModel(Budget.name) private budgetModel: Model<BudgetDocument>){}

  create(budget: Budget) : Promise<Budget>{
    return this.budgetModel.create(budget)
  }


  findAll(): Promise<Budget[]>{
    return this.budgetModel.find().populate('category');
  }
  
  findOne(id: string) :Promise<Budget> {
    return this.budgetModel.findById(id);
  }
  
  update(id: string, budget: Budget) : Promise<Budget> {
    return this.budgetModel.findByIdAndUpdate(id,budget);
  }
  
  remove(id: string) :Promise<Budget>{
    return this.budgetModel.findByIdAndDelete(id);
  }
}
