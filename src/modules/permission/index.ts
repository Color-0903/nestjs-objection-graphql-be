import { flatten } from '@nestjs/common';
import { CrudPermissionDefinition, PermissionDefinition, PermissionMetadata } from './permission-definition';

export const Permission = {
  Authenticated: new PermissionDefinition({
    name: 'Authenticated',
    description: 'Authenticated means simply that the user is logged in',
    assignable: true,
    internal: true,
  }),
  SuperAdmin: new PermissionDefinition({
    name: 'SuperAdmin',
    description: 'SuperAdmin has unrestricted access to all operations',
    assignable: true,
    internal: true,
  }),
  Public: new PermissionDefinition({
    name: 'Public',
    description: `Public means any unauthenticated user may perform the operation`,
    assignable: false,
    internal: true,
  }),
  Customer: new CrudPermissionDefinition('Customer'),
  Administrator: new CrudPermissionDefinition('Administrator'),
};

export function getAllPermissionsMetadata(): PermissionMetadata[] {
  const allPermissions = flatten(Object.keys(Permission).map((key) => [Permission[key]]));
  return allPermissions.reduce((all, def) => [...all, ...def.getMetadata()], [] as PermissionMetadata[]);
}
