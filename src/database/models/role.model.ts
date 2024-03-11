import { Column, Relation, Table, columnTypes } from 'nestjs-objection';
import { BaseModel } from './base.model';
import { Field, ObjectType } from '@nestjs/graphql';

@Table({ tableName: 'roles' })
@ObjectType()
export class Role extends BaseModel {
  @Column({ type: columnTypes.string })
  @Field((type) => String)
  name: string;

  @Field((type) => [String])
  permissions: string[];
}
