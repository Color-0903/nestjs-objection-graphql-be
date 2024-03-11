import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthResolver } from './auth.resolver';
import { JwtStrategy } from './guard/jwt.strategy';
import { AuthService } from './auth.service';
import { PasswordCipher } from 'src/common/util/password-cipher';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
    
  ],
  providers: [AuthResolver, JwtStrategy, AuthService, PasswordCipher],
  exports: [AuthService]
})
export class AuthModule {}
