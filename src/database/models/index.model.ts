import { Global, Module, Provider } from '@nestjs/common';
import { Model } from 'objection';
import { PgConfig } from 'src/database/config';
import { Role } from 'src/database/models/role.model';
import { User } from 'src/database/models/user.model';
import { Customer } from './customer.model';
import { Administrator } from './administrator.model';
const knex = require('knex')(PgConfig);

const models = [User, Role, Customer, Administrator];

const modelProviders = models.map((model) => {
  return {
    provide: model.name,
    useValue: model,
  };
});

const providers: Provider[] = [
  ...modelProviders,
  {
    provide: 'KnexConnection',
    useFactory: async () => {
      Model.knex(knex);
      knex;
    },
  },
];

@Global()
@Module({
  exports: [...providers],
  providers: [...providers],
})
export class ModelModule {}
