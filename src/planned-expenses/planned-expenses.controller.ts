// planned-expenses.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlannedExpensesService } from './planned-expenses.service';

@Controller('planned-expenses')
export class PlannedExpensesController {
  constructor(private readonly plannedExpensesService: PlannedExpensesService) {}

  @Post()
  create(@Body() createPlannedExpenseDto: any) {
    return this.plannedExpensesService.create(createPlannedExpenseDto);
  }

  @Get()
  findAll() {
    return this.plannedExpensesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.plannedExpensesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlannedExpenseDto: any) {
    return this.plannedExpensesService.update(id, updatePlannedExpenseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.plannedExpensesService.remove(id);
  }
}
