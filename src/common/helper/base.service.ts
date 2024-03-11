import { Model, ModelClass, QueryBuilderType } from 'objection';
import { DELETE_TYPE, STATUS_RETURN } from '../constants/enum';
import { Filter } from '../dtos/filter.dto';
import { pagination, paginationResponse } from '../util/pagination';
import { BadRequestException } from '@nestjs/common';

export class Helper<T extends Model> {
  private baseModel: ModelClass<T>;

  constructor(Model) {
    this.baseModel = Model;
  }

  async findAll(
    filter?: Filter,
    conditions?: any,
    withGraphTable?: string[],
  ): Promise<paginationResponse<T> | T[]> {
    const _conditions = this.handleCondition(conditions);
    let query: any = this.baseModel.query().where(_conditions);
    if (withGraphTable && withGraphTable.length > 0) {
      withGraphTable.forEach((table) => {
        query.withGraphFetched(table);
      });
    }

    query = filter
      ? ((await pagination(query, filter)) as paginationResponse<T>)
      : ((await query) as T[]);

    return query;
  }

  async findOneBy(conditions: any, withGraphTable?: string[]): Promise<T> {
    const _conditions = this.handleCondition(conditions);
    const query = this.baseModel.query().findOne(_conditions);
    if (withGraphTable && withGraphTable.length > 0) {
      withGraphTable.forEach((table) => {
        query.withGraphFetched(table);
      });
    }
    return (await query) as T;
  }

  async findById(id: string, withGraphTable?: string[]): Promise<T> {
    const query = this.baseModel.query().where({ deleteAt: null }).findById(id);

    if (withGraphTable && withGraphTable.length > 0) {
      withGraphTable.forEach((table) => {
        query.withGraphFetched(table);
      });
    }
    return (await query) as T;
  }

  async insert(item, graph?: Boolean): Promise<T> {
    try {
      const response = graph
        ? await this.baseModel.query().insertGraphAndFetch(item)
        : await this.baseModel.query().insertAndFetch(item);
      return response as T;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async update(id: string, item): Promise<T> {
    try {
      await this.baseModel.query().update(item).where('id', id);
      return (await this.baseModel.query().findById(id)) as T;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async delete(id: string, type: DELETE_TYPE): Promise<String> {
    try {
      if (type === DELETE_TYPE.HARD) {
        await this.baseModel.query().delete().where('id', id);
      } else {
        await this.baseModel
          .query()
          .update({ deleteAt: new Date() })
          .where('id', id);
      }
      return STATUS_RETURN.SUCCESS;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  private handleCondition = (conditions?) => {
    let response = {
      deleteAt: null,
    };
    if (conditions) {
      response = {
        ...response,
        ...conditions,
      };
    }
    return response;
  };
}
