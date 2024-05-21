import { Controller, Get, Post, Body, Patch, Param, Delete ,UseGuards} from '@nestjs/common';
import { BudgetService } from './budget.service';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Budget } from './entities/budget.entity';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('budget')
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  @Post("/add")
  create(@Body() createBudgetDto: Budget) {
    return this.budgetService.create(createBudgetDto);
  }

  @Get("/list")
  findAll() {
    return this.budgetService.findAll();
  }

  @Get('/get/:id')
  findOne(@Param('id') id: string) {
    return this.budgetService.findOne(id);
  }

  @Patch('/update/:id')
  update(@Param('id') id: string, @Body() updateBudgetDto: Budget) {
    return this.budgetService.update(id, updateBudgetDto);
  }

  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.budgetService.remove(id);
  }
}
