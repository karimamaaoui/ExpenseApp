import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@nestjs/mongoose';

export class UpdateCategoryDto  {
    @Prop()
    @ApiProperty()
    nameCat: string;
   
}
