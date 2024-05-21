/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Category } from "src/category/entities/category.entity";
import { Document, Schema as MongooseSchema } from 'mongoose';


export type BudgetDocument = Budget & Document;
@Schema({
    timestamps: true
})
export class Budget {
 
  @Prop()
  @ApiProperty()
  amount: number

  @ApiProperty()
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Category', required: true }) 
  category: Category;


}

export const BudgetSchema = SchemaFactory.createForClass(Budget);