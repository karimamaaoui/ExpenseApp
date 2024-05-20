/* eslint-disable prettier/prettier */
// transactions.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction, TransactionDocument } from './entities/transaction.entity';
import { Budget, BudgetDocument } from 'src/budget/entities/budget.entity';
import { Model } from 'mongoose';
import { Document } from 'mongoose';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>,
    @InjectModel(Budget.name) private budgetModel: Model<BudgetDocument>,
  ) {}

  // async create(transaction: Transaction): Promise<Transaction> {
  //   const budget = await this.budgetModel.findById(transaction.budget).populate('transactions').exec();
  //   if (!budget) {
  //     throw new NotFoundException('Budget not found');
  //   }
  
  //   // Manually cast the populated budget object to include the transactions property
  //   const populatedBudget = budget.toObject() as Document & Budget & { transactions: Transaction[] };
  
  //   const totalSpent = populatedBudget.transactions.reduce((sum, t) => sum + t.amount, 0);
  
  //   if (totalSpent + transaction.amount > populatedBudget.amount) {
  //     // Logic to send notification (e.g., email, SMS, in-app notification)
  //     this.sendNotification(`Transaction exceeds budget! Total spent: ${totalSpent}, Budget: ${populatedBudget.amount}`);
  //     throw new BadRequestException('Transaction exceeds budget');
  //   }
  
  //   const newTransaction = await this.transactionModel.create(transaction);
  //   populatedBudget.transactions.push(newTransaction);
  //   await this.budgetModel.findByIdAndUpdate(populatedBudget._id, { transactions: populatedBudget.transactions });
  
  //   return newTransaction;
  // }
  create(transaction: Transaction) : Promise<Transaction>{
  
    return this.transactionModel.create(transaction);
  }

  findAll(): Promise<Transaction[]> {
    return this.transactionModel.find().populate('category').exec();
  }

  findOne(id: string): Promise<Transaction> {
    return this.transactionModel.findById(id).populate('category').exec();
  }

  update(id: string, transaction: Transaction): Promise<Transaction> {
    return this.transactionModel.findByIdAndUpdate(id, transaction).exec();
  }

  remove(id: string): Promise<Transaction> {
    return this.transactionModel.findByIdAndDelete(id).exec();
  }

  async findTransactions(query: any): Promise<Transaction[]> {
    // Your implementation to find transactions based on the query
    // For example:
    return this.transactionModel.find(query).exec();
  }

  private sendNotification(message: string) {
    // Replace with actual notification logic (email, SMS, etc.)
    console.log(message);
  }
}
