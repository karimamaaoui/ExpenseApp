import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './entities/user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Module({
  imports: [
    PassportModule.register({defaultStrategy: 'jwt'}),
  JwtModule.registerAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      return {
      secret: configService.get<string>('JWT_SECRET'),
      signOptions: {
        expiresIn: configService.get<string | number>('JWT_EXPIRES'),}
    
    }
    }
  }),
    
    MongooseModule.forFeature([{name: 'User', schema: UserSchema}])],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
