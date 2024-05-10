import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { User, UserDocument } from './entities/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signUpDto';
import { LoginDto } from './dto/loginDto';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private configService: ConfigService,
    private mailerService: MailerService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { username, email, password } = signUpDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      username,
      email,
      password: hashedPassword,
    });
    const token = this.jwtService.sign(
      { id: user._id },
      { secret: this.configService.get<string>('JWT_SECRET') },
    );
    return { token };
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Email is incorrect');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Password is incorrect');
    }

    const token = this.jwtService.sign(
      { id: user._id },
      { secret: this.configService.get<string>('JWT_SECRET') },
    );
    return { token };
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    // Generate password reset token
    const token = this.jwtService.sign({ id: user._id }, { secret: process.env.JWT_SECRET ,expiresIn: '1h' });
    console.log("token from forgotpassword", token);
    const resetLink = `http://localhost:4200/reset-password?token=${token}`;

    const emailText = `Hello,\n\nYou have requested to reset your password. Please click the following link to reset your password:\n\n${resetLink}\n\nIf you did not request this, please ignore this email.`;

    // Send password reset email
    await this.mailerService.sendMail({
      to: email,
      subject: 'Password Reset',
      text: 
        
         emailText         
      
    });
  }
  async resetPassword(token: string, newPassword: string): Promise<void> {
    console.log("token from service",token);
    console.log("new password from service",newPassword);

    // Decode the token to get the user ID
    const { id } = this.jwtService.decode(token) as { id: string };
    
    // Find the user by ID
    const user = await this.userModel.findById(id);
    
    // If user not found, throw NotFoundException
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password
    user.password = hashedPassword;
    await user.save();
  }



}
