// summary.controller.ts

import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { SummaryService, DetailedSummary } from './summary.service';  // Import DetailedSummary
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('summary')
export class SummaryController {
  constructor(private readonly summaryService: SummaryService) {}

  @Get()
  async getSummary(): Promise<DetailedSummary> {  // Use DetailedSummary as the return type
    return this.summaryService.getDetailedSummary();
  }

  @Get('pdf')
  async getSummaryPDF(@Res() res: Response) {
    const pdfBuffer = await this.summaryService.generateSummaryPDF();
    res.set({
      'content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=summary.pdf',
      'Content-Length': pdfBuffer.length,
    });
    res.end(pdfBuffer);
  }
}
