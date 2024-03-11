import { Inject, Injectable } from '@nestjs/common';
import { Permission, getAllPermissionsMetadata } from '../permission';
import { USER_TYPE } from 'src/common/constants/enum';
import { Helper } from 'src/common/helper/base.service';
import { Role } from 'src/database/models/role.model';
import { User } from 'src/database/models/user.model';
import { Administrator } from 'src/database/models/administrator.model';
import { ModelClass } from 'objection';

@Injectable()
export class AdministratorService {
  private adminHelper: Helper<User>;
  private roleHelper: Helper<Role>;
  private userHelper: Helper<User>;

  constructor(
    @Inject('Administrator')
    private readonly adminModel: ModelClass<Administrator>,
    @Inject('User') private readonly userModel: ModelClass<User>,
    @Inject('Role') private readonly roleModel: ModelClass<Role>,
  ) {
    this.adminHelper = new Helper(this.adminModel);
    this.roleHelper = new Helper(this.roleModel);
    this.userHelper = new Helper(this.userModel);
  }

  async initAdministrators() {
    await this.ensureSuperAdminExists();
  }
  private async ensureSuperAdminExists() {
    const superadminCredentials = {
      identifier: process.env.SUPERADMIN_IDENTIFIER,
      password: process.env.SUPERADMIN_PASSWORD,
    };
    if (!superadminCredentials.identifier) {
      throw new Error('SUPERADMIN_IDENTIFIER is not configured on .env file');
    }
    if (!superadminCredentials.password) {
      throw new Error('SUPERADMIN_PASSWORD is not configured on .env file');
    }

    const superAdminUser = await this.userHelper.findOneBy({
      identifier: superadminCredentials.identifier,
      type: USER_TYPE.ADMIN,
    });

    if (!superAdminUser) {
      const superAdminRole = await this.roleHelper.findOneBy({
        name: Permission.SuperAdmin.name,
      });
      const userRecord = await this.userHelper.insert({
        identifier: process.env.SUPERADMIN_IDENTIFIER,
        password: process.env.SUPERADMIN_PASSWORD,
        type: USER_TYPE.ADMIN,
        administrator: { emailAddress: process.env.SUPERADMIN_IDENTIFIER, fullName: 'Super Admin' },
        user_role: [{ roleId: superAdminRole.id }],
      }, true);
    }
  }
}
