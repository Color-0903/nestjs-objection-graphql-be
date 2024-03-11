import {
  Module
} from '@nestjs/common';
import { RoleModule } from '../role/role.module';
import { InitializerService } from './initializer.service';
import { AdministratorModule } from '../administrator/administrator.module';

@Module({
  imports: [RoleModule, AdministratorModule],
  providers: [InitializerService],
})
export class InitializerModule {}
