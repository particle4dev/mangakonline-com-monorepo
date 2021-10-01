import * as path from 'path';
import { Injectable } from '@nestjs/common';
import GraphQLJSON, { GraphQLJSONObject } from 'graphql-type-json';
import { GqlOptionsFactory, GqlModuleOptions } from '@nestjs/graphql';
import { ExtractJwt } from 'passport-jwt';
import { AuthService } from '../auth-module/auth.service';
import schemaDirectives from './directives';
import { basePath } from '../constants';

@Injectable()
export class GraphqlOptions implements GqlOptionsFactory {
  constructor(
    private readonly authService: AuthService,
    // private readonly configService: ConfigService
  ) {}

  createGqlOptions(): Promise<GqlModuleOptions> | GqlModuleOptions {
    return {
      typePaths: [`${basePath}/**/*.graphql`],
      definitions: {
        path: path.join(basePath, 'src', 'graphql.schema.ts'),
        outputAs: 'class',
      },
      resolvers: {
        JSON: GraphQLJSON,
        JSONObject: GraphQLJSONObject
      },
      tracing: true,
      schemaDirectives,
      debug: false,
      playground: process.env.NODE_ENV === 'development' && {
        settings: {
          'editor.cursorShape': 'underline', // possible values: 'line', 'block', 'underline'
          'editor.fontFamily': `'Source Code Pro', 'Consolas', 'Inconsolata', 'Droid Sans Mono', 'Monaco', monospace`,
          'editor.fontSize': 14,
          'editor.reuseHeaders': true, // new tab reuses headers from last tab
          'editor.theme': 'dark', // possible values: 'dark', 'light'
          'general.betaUpdates': true,
          'queryPlan.hideQueryPlanResponse': false,
          'request.credentials': 'include', // possible values: 'omit', 'include', 'same-origin'
          'tracing.hideTracingResponse': false
        }
        // tabs: [
        // 	{
        // 		endpoint: END_POINT,
        // 		query: '{ hello }'
        // 	}
        // ]
      },
      installSubscriptionHandlers: true,
      // https://www.apollographql.com/docs/apollo-server/security/authentication/
      // context: async ({ req, res, connection }) => {
      context: async ({ req, connection }) => {
        try {
          if (connection) {
            const { currentUser } = connection.context;
            return {
              currentUser
            };
          }

          // const accessToken = this.configService.get<string>('ACCESS_TOKEN');
          let currentUser;
          const fromAuthHeaderAsBearerToken = ExtractJwt.fromAuthHeaderAsBearerToken();
          const token = fromAuthHeaderAsBearerToken(req) || null;
          if (token) {
            currentUser = await this.authService.verifyToken(token);
          }
          return {
            currentUser
          };
        } catch (err) {
          console.log(err, 'graphql-module.context');
        }
      },
    };
  }
}
