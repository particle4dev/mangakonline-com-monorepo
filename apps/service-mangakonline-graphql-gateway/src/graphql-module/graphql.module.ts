import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from '../auth-module/auth.module';
import { DateScalar } from './scalars/DateScalarType';
import { ObjectIdScalar } from './scalars/ObjectIdScalarType';
import { GraphqlOptions } from './graphql.options';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      imports: [
        AuthModule,
      ],
      useClass: GraphqlOptions,
    }),
  ],
  providers: [DateScalar, ObjectIdScalar],
})
export class GraphqlModule {}
