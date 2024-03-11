import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { DatabaseModule } from './database';
import { ModelModule } from './database/models/index.model';
import { AuthModule } from './modules/auth/auth.module';
import { AuthorizationGuard } from './modules/auth/guard/authorization.guard';
import { CustomerModule } from './modules/customer/customer.module';
import { InitializerModule } from './modules/initializer/initializer.module';

@Module({
  imports: [
    ModelModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      autoSchemaFile: true,
    }),
    DatabaseModule,
    InitializerModule,
    CustomerModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthorizationGuard,
    },
  ],
})
export class AppModule {}
