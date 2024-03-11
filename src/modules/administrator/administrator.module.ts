import { Module } from '@nestjs/common';
import { AdministratorService } from './administrator.service';

@Module({
  imports: [],
  controllers: [],
  providers: [AdministratorService],
  exports: [AdministratorService],
})
export class AdministratorModule {}
