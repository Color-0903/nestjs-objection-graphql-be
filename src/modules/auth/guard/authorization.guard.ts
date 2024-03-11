import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, flatten } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Permission } from '../../permission';
import { PermissionDefinition } from '../../permission/permission-definition';
import { PERMISSIONS_METADATA_KEY } from './allow.decorator';
import { AuthService } from '../auth.service';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    private reflector: Reflector , private authService: AuthService,
  ) { }

  checkValid(
    permisstionRequired: PermissionDefinition[],
    currentUserPermission: string[],
  ) {
    let valid = true;
    permisstionRequired.forEach((require) => {
      valid = valid && currentUserPermission.includes(require.name);
    });
    return valid;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const permissions = this.reflector.get<PermissionDefinition[]>(
      PERMISSIONS_METADATA_KEY,
      context.getHandler(),
    );
    if (!permissions) {
      return true;
    }
    const isPublic =
      !!permissions &&
      permissions.map((x) => x.name).includes(Permission.Public.name);

    if (!permissions || isPublic) {
      return true;
    } else {

      const request = GqlExecutionContext.create(context).getContext();
      const token = request?.req?.headers?.authorization as string;

      const userJwt = this.authService.decode(token);
      if (!userJwt) {
        throw new UnauthorizedException();
      }
      const user = await this.authService.profile(userJwt.id);
      if (!user) {
        throw new UnauthorizedException();
      }
      // (context.switchToHttp().getRequest() as any).user = user;
      const currentUserPermission = Array.from(
        new Set(flatten(user.roles?.map((r) => r.permissions))),
      ) as string[];
      const canActivate = this.checkValid(permissions, currentUserPermission);
      if (!canActivate) {
        throw new UnauthorizedException();
      } else {
        return canActivate;
      }
    }
  }
}
