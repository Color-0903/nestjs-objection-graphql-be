// import { BadRequestException, Inject, Injectable } from '@nestjs/common';
// import { PgConfig } from 'src/database/config';
// import { DELETE_TYPE, STATUS_RETURN } from '../constants/enum';
// import { ModelClass } from 'objection';
// const knex = require('knex')(PgConfig);

// export const _kenx = knex;

// export class BaseService {
//   protected readonly table: String;

//   constructor(table: String) {
//     this.table = table;
//   }

//   _findAll = async (conditions?, selectColumns = ['*']) => {
//     const whereCondition = handleCondition(conditions);
//     try {
//       return await knex(this.table).where(whereCondition).select(selectColumns);
//     } catch (error) {
//       throw new BadRequestException(error);
//     }
//   };

//   _findOneBy = async (conditions, selectColumns = ['*']) => {
//     const whereCondition = handleCondition(conditions);
//     try {
//       return await knex(this.table)
//         .where(whereCondition)
//         .first()
//         .select(selectColumns);
//     } catch (error) {
//       throw new BadRequestException(error);
//     }
//   };

//   _findById = async (id, selectColumns = ['*']) => {
//     try {
//       return await knex(this.table)
//         .where({ id, deleteAt: null })
//         .first()
//         .select(selectColumns);
//     } catch (error) {
//       throw new BadRequestException(error);
//     }
//   };

//   _insert = async (data) => {
//     try {
//       return await knex(this.table)
//         .insert(data)
//         .returning('*')
//         .then((response) => response[0]);
//     } catch (error) {
//       throw new BadRequestException(error);
//     }
//   };

//   _update = async (id, data) => {
//     try {
//       return await knex(this.table)
//         .where({ id })
//         .update({ ...data, lastModifiedOnDate: new Date() })
//         .returning('*')
//         .then((response) => response[0]);
//     } catch (error) {
//       throw new BadRequestException(error);
//     }
//   };

//   _delete = async (id, type: DELETE_TYPE = DELETE_TYPE.HARD) => {
//     try {
//       if (type === DELETE_TYPE.SORT) {
//         await this._update(id, { deleteAt: new Date() });
//       } else {
//         await knex(this.table).where({ id }).del();
//       }
//       return STATUS_RETURN.SUCCESS;
//     } catch (error) {
//       throw new BadRequestException(error);
//     }
//   };
// }

// const handleCondition = (value?) => {
//   let condition = {
//     deleteAt: null,
//   };

//   if (value) {
//     condition = {
//       ...condition,
//       ...value,
//     };
//   }

//   return condition;
// };
