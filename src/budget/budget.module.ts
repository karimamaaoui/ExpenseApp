import { Module } from '@nestjs/common';
import { BudgetService } from './budget.service';
import { BudgetController } from './budget.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BudgetSchema } from './entities/budget.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({   
  imports: [MongooseModule.forFeature([{name: 'Budget', schema: BudgetSchema}]),AuthModule],

  controllers: [BudgetController],
  providers: [BudgetService],
})
export class BudgetModule {}
