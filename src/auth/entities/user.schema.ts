import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty, ApiTags } from "@nestjs/swagger";
import {Document} from 'mongoose';


export type UserDocument = User & Document;
@Schema({
    timestamps: true
})
@ApiTags('users')
export class User {
  @Prop()
  @ApiProperty()
  username: string;

  @Prop()
  @ApiProperty()
  email: string

  @Prop()
  @ApiProperty()
  password: string;


}

export const UserSchema = SchemaFactory.createForClass(User);