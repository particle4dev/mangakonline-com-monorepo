// Login Page
import * as React from 'react';
import withApollo from '../apollo';
import LoginPageContent from '../containers/LoginPageContent';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('pages:Login');

const Login = () => {
  debug('render');

  return (
    <LoginPageContent />
  );
};

if (process.env.NODE_ENV !== 'production') {
  Login.displayName = 'pages__Login';
}

Login.defaultProps = {};

export default withApollo(Login);
