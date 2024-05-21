// summary.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SummaryService } from './summary.service';
import { SummaryController } from './summary.controller';
import { Transaction, TransactionSchema } from '../transactions/entities/transaction.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Transaction.name, schema: TransactionSchema }]),
    AuthModule,
  ],
  providers: [SummaryService],
  controllers: [SummaryController],
})
export class SummaryModule {}
