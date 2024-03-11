import { InputType } from '@nestjs/graphql';
import { ApiHideProperty } from '@nestjs/swagger';
@InputType()
export abstract class AbstractDto {
  @ApiHideProperty()
  createByUserId?: string;

  @ApiHideProperty()
  lastModifiedByUserId?: string;
}
