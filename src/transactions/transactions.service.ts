import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction, TransactionDocument } from './entities/transaction.entity';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from 'src/category/entities/category.entity';

@Injectable()
export class TransactionsService {

  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
    @InjectModel(Category.name)
    private categoryModel: Model<CategoryDocument>
){}

create(transaction: Transaction) : Promise<Transaction>{
  
  return this.transactionModel.create(transaction);
}

findAll(): Promise<Transaction[]>{
  return this.transactionModel.find().populate('category');
}

findOne(id: string) :Promise<Transaction> {
  return this.transactionModel.findById(id);
}

update(id: string, transaction: Transaction) : Promise<Transaction> {
  return this.transactionModel.findByIdAndUpdate(id,transaction);
}

remove(id: string) :Promise<Transaction>{
  return this.transactionModel.findByIdAndDelete(id);
}


async findTransactions(query: any): Promise<Transaction[]> {
  const searchQuery = this.buildSearchQuery(query);
  if (query.nameCat) {
    const categoryId = await this.findCategoryIdByName(query.nameCat);
    searchQuery['category'] = categoryId;
    delete searchQuery.nameCat; // delete nameCat from search
  }
  return this.transactionModel.find(searchQuery).populate('category').exec();
}

private async findCategoryIdByName(nameCat: string): Promise<string> {
  const category = await this.categoryModel.findOne({ nameCat });
 
  return category._id;
}
private buildSearchQuery(query: any): any {
  const searchQuery = {};

  for (const key in query) {
    if (query[key]) {
      searchQuery[key] = query[key];
    }
  }

  return searchQuery;
}

}
