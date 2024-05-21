import {IsEmail, IsNotEmpty, IsString, MinLength} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SignUpDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly username : string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail({},{message: "please enter correct email"})
    email: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString() 
    @MinLength(6)
    password:string;
}