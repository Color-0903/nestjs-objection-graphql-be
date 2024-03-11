import { ApiHideProperty } from '@nestjs/swagger';

export abstract class AbstractDto {
  @ApiHideProperty()
  createdByUserId?: string;
  @ApiHideProperty()
  lastModifiedByUserId?: string;
}
