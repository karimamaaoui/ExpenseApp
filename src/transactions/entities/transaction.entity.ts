import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {Document} from 'mongoose';
import { ApiProperty } from "@nestjs/swagger";


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

  @Prop()
  @ApiProperty()
  category: string;

  @Prop([String])
  @ApiProperty() 
  tags: [String]

}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);