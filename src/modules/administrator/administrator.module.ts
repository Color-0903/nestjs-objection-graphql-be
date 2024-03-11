import { Module } from '@nestjs/common';
import { AdministratorService } from './administrator.service';
import { PasswordCipher } from 'src/common/util/password-cipher';

@Module({
  imports: [],
  controllers: [],
  providers: [AdministratorService, PasswordCipher],
  exports: [AdministratorService],
})
export class AdministratorModule {}
