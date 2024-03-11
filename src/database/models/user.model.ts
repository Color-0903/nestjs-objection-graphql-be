import { Column, Relation, Table, columnTypes } from 'nestjs-objection';
import { USER_TYPE } from 'src/common/constants/enum';
import { BaseModel } from './base.model';
import { Customer } from './customer.model';
import { Role } from './role.model';
import { User_Role } from './user_role.model';
import { Field, ObjectType } from '@nestjs/graphql';
import { Administrator } from './administrator.model';

@Table({ tableName: 'users' })
@ObjectType()
export class User extends BaseModel {
  @Column({ type: columnTypes.string })
  @Field((type) => String)
  identifier: string;

  @Column({ type: columnTypes.string })
  // @Field((type) => String)
  password: string;

  @Column({ type: columnTypes.string })
  @Field((type) => String)
  type: USER_TYPE;

  @Column({ type: columnTypes.boolean, nullable: true })
  @Field((type) => String, { nullable: true })
  isActive?: Boolean;

  @Column({ type: columnTypes.boolean, nullable: true })
  @Field((type) => Boolean, { nullable: true })
  verified?: boolean;

  @Field((type) => Customer, { nullable: true })
  @Relation({
    modelClass: Customer,
    relation: BaseModel.HasOneRelation,
    join: {
      from: 'users.id',
      to: 'customers.userId',
    },
  })
  customer?: Customer;

  @Field((type) => Administrator, { nullable: true })
  @Relation({
    modelClass: Administrator,
    relation: BaseModel.HasOneRelation,
    join: {
      from: 'users.id',
      to: 'administrators.userId',
    },
  })
  administrator?: Administrator;

  @Relation({
    modelClass: User_Role,
    relation: BaseModel.HasManyRelation,
    join: {
      from: 'users.id',
      to: 'user_role.userId',
    },
  })
  user_role: User_Role[];

  @Field((type) => [Role], { nullable: true })
  @Relation({
    modelClass: Role,
    relation: BaseModel.ManyToManyRelation,
    join: {
      from: 'users.id',
      through: {
        from: 'user_role.userId',
        to: 'user_role.roleId',
      },
      to: 'roles.id',
    },
  })
  roles?: Role[];
}
