/* eslint-disable prettier/prettier */
// transactions.module.ts

import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from './entities/transaction.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Budget, BudgetSchema } from 'src/budget/entities/budget.entity'; // Import Budget and its schema
import { Category, CategorySchema } from 'src/category/entities/category.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
      { name: Budget.name, schema: BudgetSchema }, // Add Budget model here
      { name: Category.name, schema: CategorySchema },
    ]),
    AuthModule,
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
