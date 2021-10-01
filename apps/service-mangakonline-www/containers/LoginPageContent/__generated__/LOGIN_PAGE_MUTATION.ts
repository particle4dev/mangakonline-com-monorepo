/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LOGIN_PAGE_MUTATION
// ====================================================

export interface LOGIN_PAGE_MUTATION_login {
  __typename: "LoginPayload";
  accessToken: string;
}

export interface LOGIN_PAGE_MUTATION {
  /**
   * Authenticates the user using the native authentication strategy.
   */
  login: LOGIN_PAGE_MUTATION_login | null;
}

export interface LOGIN_PAGE_MUTATIONVariables {
  username: string;
  password: string;
}
