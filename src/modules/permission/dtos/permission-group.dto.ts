import { PermissionDefinitionConfig } from './permission-definition-config.dto';

export class PermissionGroupDto {
  label: string;
  description: string;
  permissions: PermissionDefinitionConfig[];
}
