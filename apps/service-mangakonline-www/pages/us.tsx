// About Page
import * as React from 'react';
import gql from 'graphql-tag';
import { useQuery, NetworkStatus } from '@apollo/client';
import { Content, Headline, Section, SectionSpacingBottom } from '@mp-workspace/ui-penguin-ui-material-ui-extension';
import Navbar from '../containers/Navbar';
import withApollo from '../apollo';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('pages:Us');

const US_PAGE_QUERY = gql`
  query US_PAGE_QUERY {
    allSets {
      id
      name
    }
  }
`;

const Us = () => {
  debug('render');
  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    US_PAGE_QUERY,
    {
      variables: {},
      // Setting this value to true will make the component rerender when
      // the "networkStatus" changes, so we are able to know if it is fetching
      // more data
      notifyOnNetworkStatusChange: true,
    }
  );

  const loadingMorePosts = networkStatus === NetworkStatus.fetchMore;

  if (loading && !loadingMorePosts) return <div>loading ...</div>;

  return (
    <>
      <Navbar></Navbar>
      <Content top={64} bottom={128}>
        <Section>
          <SectionSpacingBottom />
          <Headline>About Us</Headline>
          <ul>
            {data && data.allSets && data.allSets.map(e => (<li>{e.name}</li>))}
          </ul>
        </Section>
      </Content>
    </>
  );
};

if (process.env.NODE_ENV !== 'production') {
  Us.displayName = 'pages__Us';
}

Us.defaultProps = {};

export default withApollo(Us);
