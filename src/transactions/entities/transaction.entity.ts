import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Category } from "src/category/entities/category.entity";
import { Document, Schema as MongooseSchema } from 'mongoose';


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
  amount: number

  @ApiProperty()
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Category', required: true }) 
  category: Category;

  @Prop()
  @ApiProperty()
  typePayment: String

  @Prop([String])
  @ApiProperty() 
  tags?: [String]

}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);