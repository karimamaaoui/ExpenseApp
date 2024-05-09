import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction, TransactionDocument } from './entities/transaction.entity';
import { Model } from 'mongoose';

@Injectable()
export class TransactionsService {

  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>
){}

create(transaction: Transaction) : Promise<Transaction>{
  
  return this.transactionModel.create(transaction);
}

findAll(): Promise<Transaction[]>{
  return this.transactionModel.find();
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
}
