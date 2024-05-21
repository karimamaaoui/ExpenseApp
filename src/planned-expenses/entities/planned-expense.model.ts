// planned-expense.model.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class PlannedExpense {
  @Prop({ required: true })
  @ApiProperty()
  name: string;

  @Prop({ required: true })
  @ApiProperty()
  amount: number;

  @Prop({ required: true })
  @ApiProperty()
  date: Date;

  @Prop()
  @ApiProperty()
  description: string;
}

export const PlannedExpenseSchema = SchemaFactory.createForClass(PlannedExpense);

export type PlannedExpenseDocument = PlannedExpense & Document;
