import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AbstractModel {
  @Field(type => String)
  id: string;

  @Field({ nullable: true })
  createByUserId?: string;

  @Field({ nullable: true })
  createdOnDate?: Date;

  @Field({ nullable: true })
  lastModifiedByUserId?: string;

  @Field({ nullable: true })
  lastModifiedOnDate?: Date;

  @Field({ nullable: true })
  deleteAt?: Date | null;
}