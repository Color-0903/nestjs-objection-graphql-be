import { Injectable } from '@nestjs/common';
import { RoleService } from '../role/role.service';
import { AdministratorService } from '../administrator/administrator.service';

@Injectable()
export class InitializerService {
  constructor(private roleService: RoleService, private administratorService: AdministratorService) {}

  async onModuleInit() {
    await this.roleService.initRoles();
    await this.administratorService.initAdministrators();
  }
}
