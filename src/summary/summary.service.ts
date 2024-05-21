// summary.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction, TransactionDocument } from '../transactions/entities/transaction.entity';
import { Category } from '../category/entities/category.entity';
const PDFDocument = require('pdfkit');

export interface CategorySummary {
  income: number;
  expense: number;
}

export interface DetailedSummary {
  totalIncome: number;
  totalExpense: number;
  netBalance: number;
  transactionCount: number;
  summaryByCategory: Record<string, CategorySummary>;
}

@Injectable()
export class SummaryService {
  constructor(
    @InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>,
  ) {}

  async getDetailedSummary(): Promise<DetailedSummary> {
    const transactions = await this.transactionModel.find().populate('category').exec();
    const totalIncome = transactions.filter(t => t.typePayment === 'income').reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = transactions.filter(t => t.typePayment !== 'expense').reduce((sum, t) => sum + t.amount, 0);

    const summaryByCategory: Record<string, CategorySummary> = transactions.reduce((acc, transaction) => {
      const categoryName = (transaction.category as Category).nameCat;
      if (!acc[categoryName]) {
        acc[categoryName] = { income: 0, expense: 0 };
      }
      if (transaction.typePayment === 'income') {
        acc[categoryName].income += transaction.amount;
      } else {
        acc[categoryName].expense += transaction.amount;
      }
      return acc;
    }, {} as Record<string, CategorySummary>);

    return {
      totalIncome,
      totalExpense,
      netBalance: totalIncome - totalExpense,
      transactionCount: transactions.length,
      summaryByCategory,
    };
  }

  async generateSummaryPDF(): Promise<Buffer> {
    const summary = await this.getDetailedSummary();
    const doc = new PDFDocument();
    const buffers = [];

    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => { /* Do nothing, or add logging */ });

    doc.fontSize(20).text('Transaction Summary', { align: 'center' });
    doc.moveDown();
    doc.text(`Total Expense: $${summary.totalExpense}`);
    doc.moveDown();

    doc.fontSize(16).text('Summary by Category', { underline: true });
    doc.moveDown();

    for (const [category, { income, expense }] of Object.entries(summary.summaryByCategory)) {
      doc.fontSize(14).text(`Category: ${category}`);
      doc.text(`  Expense: $${expense}`);
      doc.moveDown();
    }

    doc.end();

    return new Promise<Buffer>((resolve, reject) => {
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });
      doc.on('error', reject);
    });
  }
}
