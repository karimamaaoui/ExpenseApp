import { Body, Controller, Post,NotFoundException ,Query} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signUpDto';
import { LoginDto } from './dto/loginDto';
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { ForgotPasswordDto } from './dto/forgotPassword.dto';
import { ResetPasswordDto } from './dto/ResetPassword.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return this.authService.signUp(signUpDto);
  }
  
  @Post('/login')
  login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }

  @Post('/forgot-password')
 
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto): Promise<{message :string}> {
    const { email } = forgotPasswordDto;

    try {
      await this.authService.forgotPassword(email);
      return { message: 'Check your email !' };

    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('User not found');
      }
      throw error;
      
    }
  }

  @Post('reset-password')
  async handleResetPassword(
    @Query('token') token: string,
        @Body() resetPasswordDto: ResetPasswordDto
  ): Promise<{ message: string }> {
    try {
      await this.authService.resetPassword(token, resetPasswordDto.newPassword);
      return { message: 'Password reset successfully' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Invalid or expired token');
      }
      throw error; 
    }
  }
  

}
