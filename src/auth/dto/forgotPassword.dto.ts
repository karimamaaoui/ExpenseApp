// forgotPassword.dto.ts

import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordDto {
  @ApiProperty({ description: 'Email address of the user' })
  email: string;
}
