/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Category } from "src/category/entities/category.entity";
import { Budget } from "src/budget/entities/budget.entity";

export type TransactionDocument = Transaction & Document;

@Schema({
    timestamps: true
})
export class Transaction {
  @Prop()
  @ApiProperty()
  description: string;

  @Prop()
  @ApiProperty()
  amount: number;

  @ApiProperty()
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Category', required: true }) 
  category: Category;

  @ApiProperty()
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Budget', required: true }) 
  budget: Budget;

  @Prop()
  @ApiProperty()
  typePayment: String;

  @Prop([String])
  @ApiProperty() 
  tags?: [String];
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);