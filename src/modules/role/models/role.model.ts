import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractModel } from 'src/common/abstract/abstract.model';

@ObjectType()
export class RoleModel extends AbstractModel {
  @Field((type) => String)
  name: string;

  @Field((type) => [String])
  permissions: [string];
}
