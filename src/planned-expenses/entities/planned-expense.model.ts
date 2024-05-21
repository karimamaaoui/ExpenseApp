// planned-expense.model.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class PlannedExpense {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  date: Date;

  @Prop()
  description: string;
}

export const PlannedExpenseSchema = SchemaFactory.createForClass(PlannedExpense);

export type PlannedExpenseDocument = PlannedExpense & Document;
