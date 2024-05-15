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
    
    
  ],
  controllers: [AppController],
  providers: [AppService, EmailService,],
})
export class AppModule {}
