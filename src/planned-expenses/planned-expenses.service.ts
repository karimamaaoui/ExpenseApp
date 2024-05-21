// planned-expenses.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlannedExpense, PlannedExpenseDocument } from './entities/planned-expense.model';

@Injectable()
export class PlannedExpensesService {
  constructor(
    @InjectModel(PlannedExpense.name) private plannedExpenseModel: Model<PlannedExpenseDocument>,
  ) {}

  async create(createPlannedExpenseDto: any): Promise<PlannedExpense> {
    const createdPlannedExpense = new this.plannedExpenseModel(createPlannedExpenseDto);
    return createdPlannedExpense.save();
  }

  async findAll(): Promise<PlannedExpense[]> {
    return this.plannedExpenseModel.find().exec();
  }

  async findOne(id: string): Promise<PlannedExpense> {
    return this.plannedExpenseModel.findById(id).exec();
  }

  async update(id: string, updatePlannedExpenseDto: any): Promise<PlannedExpense> {
    return this.plannedExpenseModel.findByIdAndUpdate(id, updatePlannedExpenseDto, { new: true }).exec();
  }

  async remove(id: string): Promise<PlannedExpense> {
    return this.plannedExpenseModel.findByIdAndDelete(id).exec();
  }
}