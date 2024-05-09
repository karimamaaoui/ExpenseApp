import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User, UserDocument } from './entities/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signUpDto';
import { LoginDto } from './dto/loginDto';
@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name)
        private userModel: Model<UserDocument>,
        private jwtService: JwtService
    ){}
    
    async signUp(signUpDto: SignUpDto): Promise<{token : string}> {

        const {username,email,password} =signUpDto;
        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await this.userModel.create({
            username,
            email,
            password: hashedPassword
        })
        const token = this.jwtService.sign({id: user._id})
        return {token}
    }

    async login(loginDto: LoginDto): Promise<{token: string}>
    {
        const {email,password}= loginDto;
        const user=await this.userModel.findOne({email});
        if(!user){
            throw new UnauthorizedException('Email is incorrect');
        }

        const isPasswordMatched = await bcrypt.compare(password,user.password);
        if (!isPasswordMatched){
            throw new UnauthorizedException('Password is incorrect');
        }

        const token = this.jwtService.sign({id : user._id})
        return {token};
    }
}
