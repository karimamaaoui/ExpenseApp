import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './entities/user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [
  PassportModule.register({defaultStrategy: 'jwt'}),
  MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
  JwtModule.registerAsync({
    imports:[ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      return {
      secret: configService.get<string>('JWT_SECRET'),
      signOptions: {
        expiresIn: configService.get<string | number>('JWT_EXPIRES'),}
    
    }
    }
  }),
    
],
  controllers: [AuthController],
  providers: [AuthService, JwtService], 
  exports: [JwtModule, JwtService],

})
export class AuthModule {}
