import { QueryBuilderType } from 'objection';
import { Filter } from '../dtos/filter.dto';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class paginationResponse<T> {
  data: T[];
  page: number | undefined | null;
  size: number | undefined | null;
  sort: string | undefined | null;
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
