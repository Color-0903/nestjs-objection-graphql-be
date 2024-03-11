import { Injectable } from '@nestjs/common';
import { PermissionDefinition } from './permission-definition';
import { getAllPermissionsMetadata } from '.';
import { PermissionGroupDto } from './dtos/permission-group.dto';

@Injectable()
export class PermissionService {
  public getAll(): PermissionGroupDto[] {
    return this.buildGrid(getAllPermissionsMetadata().filter((p) => !p.internal));
  }

  private buildGrid(permissionDefinitions): PermissionGroupDto[] {
    const crudGroups = new Map<string, PermissionDefinition[]>();
    const nonCrud: PermissionDefinition[] = [];
    const crudRe = /^(Create|Read|Update|Delete)([a-zA-Z]+)$/;
    for (const def of permissionDefinitions) {
      const isCrud = crudRe.test(def.name);
      if (isCrud) {
        const groupName = def.name.match(crudRe)?.[2];
        if (groupName) {
          const existing = crudGroups.get(groupName);
          if (existing) {
            existing.push(def);
          } else {
            crudGroups.set(groupName, [def]);
          }
        }
      } else if (def.assignable) {
        nonCrud.push(def);
      }
    }
    const gridData = [
      ...nonCrud.map((d) => ({
        label: d.name,
        description: d.description,
        permissions: [d],
      })),
      ...Array.from(crudGroups.entries()).map(([label, defs]) => {
        return {
          label,
          description: this.extractCrudDescription(defs[0]),
          permissions: defs,
        };
      }),
    ];

    return gridData;
  }

  private extractCrudDescription(def: PermissionDefinition): string {
    return def.description.replace(/Grants permission to [\w]+/, 'Grants permissions on');
  }
}
