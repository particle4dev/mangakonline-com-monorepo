import {
  SchemaDirectiveVisitor,
  AuthenticationError
} from 'apollo-server-express';
import { defaultFieldResolver } from 'graphql';

export default class hasRole extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;

    field.resolve = function(...args) {
      const { currentUser } = args[2];

      if (!currentUser) {
        throw new AuthenticationError(
          'Authentication token is invalid, please try again.'
        );
      }

      const allowedRoles = this.args.role;
      const { roles } = currentUser;
      if(roles.indexOf(allowedRoles) === -1) {
        throw new AuthenticationError(
          'Invalid role!'
        );
      }

      return resolve.apply(this, args);
    };
  }
}
