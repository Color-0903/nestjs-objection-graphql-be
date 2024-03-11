import { Inject, Injectable } from '@nestjs/common';
import { Permission, getAllPermissionsMetadata } from '../permission';
import { Helper } from 'src/common/helper/base.service';
import { Role } from 'src/database/models/role.model';
import { ModelClass } from 'objection';

@Injectable()
export class RoleService {
  private roleHelper: Helper<Role>;

  constructor(@Inject('Role') private readonly roleModel: ModelClass<Role>) {
    this.roleHelper = new Helper(this.roleModel);
  }

  async initRoles() {
    await this.ensureCustomerRoleExists();
    await this.ensureSuperAdminRoleExists();
    await this.ensureRolesHaveValidPermissions();
  }

  private async ensureCustomerRoleExists() {
    const findRole = await this.roleHelper.findOneBy({
      name: Permission.Customer.name,
    });

    if (!findRole?.id) {
      await this.roleHelper.insert({
        name: Permission.Customer.name,
        permissions: [Permission.Authenticated.name],
      });
    }
  }

  private async ensureSuperAdminRoleExists() {
    const assignablePermissions = this.getAllAssignablePermissions();
    try {
      const superAdminRole = await this.roleHelper.findOneBy({
        name: Permission.SuperAdmin.name,
      });

      if (!!superAdminRole?.id) {
        await this.roleHelper.update(superAdminRole.id, {
          permissions: assignablePermissions,
        });
      } else {
        await this.roleHelper.insert({
          name: Permission.SuperAdmin.name,
          permissions: assignablePermissions,
        });
      }
    } catch (err) {
      throw err;
    }
  }

  private async ensureRolesHaveValidPermissions() {
    const roles = ((await this.roleHelper.findAll()) as Role[]) || [];
    const assignablePermissions = this.getAllAssignablePermissions();
    for (const role of roles) {
      const invalidPermissions = role.permissions.filter(
        (p) => !assignablePermissions.includes(p),
      );
      if (invalidPermissions.length) {
        role.permissions = role.permissions.filter((p) =>
          assignablePermissions.includes(p),
        );
        await this.roleHelper.update(role.id, { Permission: role.permissions });
      }
    }
  }

  private getAllAssignablePermissions(): string[] {
    return getAllPermissionsMetadata()
      .filter((p) => p.assignable)
      .map((p) => p.name as string);
  }
}
