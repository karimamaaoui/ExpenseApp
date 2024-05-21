import { Test, TestingModule } from '@nestjs/testing';
import { PlannedExpensesController } from './planned-expenses.controller';
import { PlannedExpensesService } from './planned-expenses.service';

describe('PlannedExpensesController', () => {
  let controller: PlannedExpensesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlannedExpensesController],
      providers: [PlannedExpensesService],
    }).compile();

    controller = module.get<PlannedExpensesController>(PlannedExpensesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
