// planned-expenses.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlannedExpensesController } from './planned-expenses.controller';
import { PlannedExpensesService } from './planned-expenses.service';
import { PlannedExpense, PlannedExpenseSchema } from './entities/planned-expense.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PlannedExpense.name, schema: PlannedExpenseSchema }]),
  ],
  controllers: [PlannedExpensesController],
  providers: [PlannedExpensesService],
})
export class PlannedExpensesModule {}
