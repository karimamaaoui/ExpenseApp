import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { Transaction } from './entities/transaction.entity';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post("/add")
  create(@Body() createTransactionDto: Transaction) {
    return this.transactionsService.create(createTransactionDto);
  }

  @Get()
  findAll() {
    return this.transactionsService.findAll();
  }

  @Get('/get/:id')
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(id);
  }

  @Patch('/update/:id')
  update(@Param('id') id: string, @Body() updateTransactionDto: Transaction) {
    return this.transactionsService.update(id, updateTransactionDto);
  }

  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(id);
  }

   @Get('/search')
  async getTransactions(@Query() query: any): Promise<Transaction[]> {
      return this.transactionsService.findTransactions(query);
  }


}
