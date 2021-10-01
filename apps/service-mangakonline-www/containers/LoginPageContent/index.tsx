import * as React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Content, Headline, Section, SectionSpacingBottom, ProgressBar } from '@mp-workspace/ui-penguin-ui-material-ui-extension';
import { useCookies } from 'react-cookie';
import { JWT_ACCESS_TOKEN_KEY } from '@mp-workspace/data-access-constants';
import Navbar from '../../containers/Navbar';

import { LOGIN_PAGE_MUTATION } from './__generated__/LOGIN_PAGE_MUTATION';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('containers:LoginPageContent');

const linearProgress = <ProgressBar />;

const LOGIN_PAGE_MUTATION_TEMPLATE = gql`
  mutation LOGIN_PAGE_MUTATION($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      accessToken
    }
  }
`;

const LoginPageContent = () => {
  debug('render');

  const [cookies, setCookie] = useCookies();

  const [login, { loading, error }] = useMutation(LOGIN_PAGE_MUTATION_TEMPLATE, {
    onCompleted({ login }: LOGIN_PAGE_MUTATION) {
      if(cookies[JWT_ACCESS_TOKEN_KEY] !== login.accessToken) {
        setCookie(JWT_ACCESS_TOKEN_KEY, login.accessToken, { path: '/' });

        // NOTE: Reset store on login, best and simple way is reload the page
        location.reload();
      }
    }
  });

  const [username, setUsername] = React.useState('john');

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const [password, setPassword] = React.useState('123');

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onClick = () => {
    login({
      variables: {
        username,
        password
      }
    });
  };

  return (
    <>
      {loading && linearProgress}
      <Navbar />
      <Content top={64}>
        <Section>
          <SectionSpacingBottom />
          <Headline>Login</Headline>
          <SectionSpacingBottom />
          <TextField label="Username" variant="outlined" disabled={loading} value={username} onChange={handleUsernameChange} />
          <SectionSpacingBottom />
          <TextField label="Password" variant="outlined" disabled={loading} value={password} onChange={handlePasswordChange} />
          <SectionSpacingBottom />
          <Button variant="contained" color="primary" disabled={loading} onClick={onClick}>
            Login
          </Button>
        </Section>
      </Content>
    </>
  );
};

if (process.env.NODE_ENV !== 'production') {
  LoginPageContent.displayName = 'containers__LoginPageContent';
}

LoginPageContent.defaultProps = {};

export default LoginPageContent;
