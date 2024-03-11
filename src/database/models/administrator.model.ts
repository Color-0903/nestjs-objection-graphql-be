import { Column, Relation, Table, columnTypes } from 'nestjs-objection';
import { BaseModel } from './base.model';
import { User } from './user.model';
import { Field, ObjectType } from '@nestjs/graphql';

@Table({ tableName: 'administrators' })
@ObjectType()
export class Administrator extends BaseModel {
  @Column({ type: columnTypes.string, nullable: true })
  @Field((type) => String, { nullable: true })
  fullName?: string;

  @Column({ type: columnTypes.string, nullable: true })
  @Field((type) => String, { nullable: true })
  emailAddress?: string;

  @Column({ type: columnTypes.date, nullable: true })
  @Field((type) => Date, { nullable: true })
  dob?: Date;

  @Column({ type: columnTypes.string })
  @Field((type) => String)
  userId?: string;

  @Relation({
    modelClass: User,
    relation: BaseModel.HasOneRelation,
    join: {
      from: 'administrators.userId',
      to: 'users.id',
    },
  })
  user?: User;
}
