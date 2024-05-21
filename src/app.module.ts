import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { TransactionsModule } from './transactions/transactions.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EmailService } from './services/email/email.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { CategoryModule } from './category/category.module';
import { BudgetModule } from './budget/budget.module';
import { ImportModule } from './import/import.module';
import { TagModule } from './tag/tag.module';
import { SummaryModule } from './summary/summary.module';
import { PlannedExpensesModule } from './planned-expenses/planned-expenses.module';

//depensesproject

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: "smtp.gmail.com",
        port: 587,
        secure: false, 
        auth: {
          user: "scongresses@gmail.com",
          pass: "tlbbxlmptvhoqjlh",
        },
      },
    }),
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    TransactionsModule,
    AuthModule,
    UsersModule,
    CategoryModule,
    BudgetModule,
    ImportModule,
    TagModule,
    SummaryModule,
    PlannedExpensesModule,
    
    
  ],
  controllers: [AppController],
  providers: [AppService, EmailService,],
})
export class AppModule {}
