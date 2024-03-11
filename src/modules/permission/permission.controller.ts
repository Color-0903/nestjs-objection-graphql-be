import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PermissionService } from './permission.service';

@ApiTags('permissions')
@Controller('permissions')
export class PermissionController {
  constructor(private permissionService: PermissionService) {}

  @Get('')
  public async get() {
    return this.permissionService.getAll();
  }
}
