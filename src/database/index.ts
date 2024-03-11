import { Module } from '@nestjs/common';
import { KnexModule } from 'nest-knexjs';
import { PgConfig } from './config';

@Module({
  imports: [
    KnexModule.forRootAsync({
      useFactory: () => ({
        config: PgConfig,
      }),
    }),
  ],
})
export class DatabaseModule {}
