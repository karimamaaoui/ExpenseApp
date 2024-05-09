import {IsEmail, IsNotEmpty, IsString, MinLength} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto{
 
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString() 
    password:string;
}