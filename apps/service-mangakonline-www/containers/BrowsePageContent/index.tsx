import * as React from 'react';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import { get } from 'dot-prop';
import { useQuery, NetworkStatus } from '@apollo/client';
import Router from 'next/router';
import {
  Tabs,
  Tab,
  Content,
  Section,
  SectionSpacingBottom,
  // TabContainer,
  ProgressBar
} from '@mp-workspace/ui-penguin-ui-material-ui-extension';
import HeadDescriptionMetaTag from '@mp-workspace/ui-next-description-meta-tag';
import HeadTitle from '@mp-workspace/ui-next-title-meta-tag';
import HeadKeywords from '@mp-workspace/ui-next-keywords-meta-tag';
import OGBasicMetaTag from '@mp-workspace/ui-next-og-meta-tag';
import { BasicCard, SummaryCard } from '@mp-workspace/ui-next-twitter-card-meta-tag';
// import FolderList from '../../components/FolderList';
import getFullURL from '../../utils/getFullURL';
import RouterSync from '../../components/RouterSync';
import { useBrowseContext, updatePath } from '../BrowseContext';
import Navbar from '../Navbar';
import GenresTab, { genresTabFragment } from './GenresTab';
import NewReleasesTab, { newReleasesTabFragment } from './NewReleasesTab';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('containers:BrowsePageContent');

const linearProgress = <ProgressBar />;

const BROWSE_PAGE_QUERY = gql`
  query BROWSE_PAGE_QUERY($afterCategories: ID, $afterNewReleaseBooks: String, $skipCategories: Boolean = false, $skipNewReleaseBooks: Boolean = false) {
    browse_page_categories: categories(first: 16, after: $afterCategories) @skip(if: $skipCategories) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        _id
        ...GenresTabFragment
      }
    }

    browse_page_new_release_books: books(first: 18, after: $afterNewReleaseBooks) @skip(if: $skipNewReleaseBooks) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        _id
        ...NewReleasesTabFragment
      }
    }
  }

  ${genresTabFragment}
  ${newReleasesTabFragment}
`;

function a11yProps(index: string | number) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const TITLE = `Online Manga List - Genres All & Status All & Latest - ${process.env.NEXT_PUBLIC_SITE_NAME}`;
const KEYWORDS = 'manga, read manga, manga online, magna scans, manga volume, manga chapter, online manga, read free manga, free manga, read free manga online, manga viewer, manga download, manga downloads, japanese comic, manhwa'.split(",").map((e: string) => e.trim());
const IMAGE = '/public/banner720-480.png';

const BrowsePageContent = () => {
  debug('render');

  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    BROWSE_PAGE_QUERY,
    {
      variables: {},
      // Setting this value to true will make the component rerender when
      // the "networkStatus" changes, so we are able to know if it is fetching
      // more data
      notifyOnNetworkStatusChange: true,
      fetchPolicy: "cache-first"
    }
  );

  const loadingMorePosts = networkStatus === NetworkStatus.fetchMore;

  const [state, dispatch] = useBrowseContext();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    // event.preventDefault();

    Router.push({
      pathname: Router.pathname,
      query: {
        t: newValue
      }
    });
  };

  const t = state.params && state.params.query && state.params.query.t || 'genres';

  function nextCategories() {
    if(get(data, 'browse_page_categories.pageInfo.hasNextPage', false)) {
      fetchMore({
        variables: {
          afterCategories: get(data, 'browse_page_categories.pageInfo.endCursor', null),
          skipCategories: false,
          skipNewReleaseBooks: true
        },
      });
    }
  }

  function nextNewReleases() {
    if(get(data, 'browse_page_new_release_books.pageInfo.hasNextPage', false)) {
      fetchMore({
        variables: {
          afterNewReleaseBooks: get(data, 'browse_page_new_release_books.pageInfo.endCursor', null),
          skipCategories: true,
          skipNewReleaseBooks: false
        },
      });
    }
  }


  const router = useRouter();
  const url = getFullURL({
    pathname: router.asPath
  });

  return (
    <>
      <HeadDescriptionMetaTag description={TITLE} />
      <HeadTitle title={TITLE} />
      <HeadKeywords keywords={KEYWORDS} />
      <BasicCard />
      <SummaryCard
        title={TITLE}
        description={TITLE}
        image={IMAGE}
      />
      <OGBasicMetaTag
        description={TITLE}
        title={TITLE}
        url={url}
        image={IMAGE}
      />
      {loading && linearProgress}
      <Navbar>
        <Tabs
          value={t}
          onChange={handleChange}
          centered
          textColor="primary"
          // scrollButtons="off"
          // indicatorColor="primary"
          // aria-label="scrollable force tabs example"
        >
          <Tab label="Genres" {...a11yProps('genres')} value="genres" style={{
            minHeight: 48
          }} />
          {/* <Tab label="Hottest" {...a11yProps('hottest')} value="hottest" style={{
            minHeight: 48
          }} /> */}
          <Tab label="New releases" {...a11yProps('new-releases')} value="new-releases" style={{
            minHeight: 48
          }} />
        </Tabs>
      </Navbar>
      <Content top={112} bottom={72}>
        <Section>
          <SectionSpacingBottom />
          {t === 'genres' && <GenresTab data={get(data, 'browse_page_categories.edges', [])} hasMore={get(data, 'browse_page_categories.pageInfo.hasNextPage', false)} next={nextCategories} />}

          {/* <TabContainer selected={t === 'hottest'}>
            <FolderList />
          </TabContainer> */}

          {t === 'new-releases' && <NewReleasesTab data={get(data, 'browse_page_new_release_books.edges', [])}  hasMore={get(data, 'browse_page_new_release_books.pageInfo.hasNextPage', false)} next={nextNewReleases} />}
        </Section>
      </Content>
      <RouterSync skipFirstRun={true} onChangeRouter={params => {dispatch(updatePath(params));}} />
    </>
  );
};

if (process.env.NODE_ENV !== 'production') {
  BrowsePageContent.displayName = 'containers__BrowsePageContent';
}

BrowsePageContent.defaultProps = {};

export default BrowsePageContent;
