import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionSchema } from './entities/transaction.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Category, CategorySchema } from 'src/category/entities/category.entity';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Transaction', schema: TransactionSchema},   { name: Category.name, schema: CategorySchema },]),AuthModule],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
