import { Field, ObjectType } from '@nestjs/graphql';
import { QueryBuilderType } from 'objection';
import { Filter } from '../dtos/filter.dto';
import { Role } from 'src/database/models/role.model';
import { User } from 'src/database/models/user.model';

@ObjectType()
export class paginationResponse<T> {

  @Field((type) => [Role] || [User], { nullable: false })
  data?: T[];

  @Field((type) => Number, { nullable: true })
  page: number;

  @Field((type) => Number, { nullable: true })
  size?: number;

  @Field((type) => String, { nullable: true })
  sort?: string;
}

export const pagination = async (
  query: QueryBuilderType<any>,
  filter?: Filter,
) => {
  const offset = (filter?.page - 1) * (filter?.size || 10);
  if (!isNaN(offset)) {
    query.offset(offset).limit(filter.size || 10);
  }
  if (filter?.sort) {
    query.orderBy(filter.sort);
  }
  const data = await query;
  return {
    data: data,
    page: filter.page,
    size: filter.size,
  };
};
