import * as React from 'react';
import gql from 'graphql-tag';
import Link from 'next/link';
import { get } from 'dot-prop';
import { useQuery, NetworkStatus } from '@apollo/client';
import BookIcon from '@material-ui/icons/Book';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Content, Section, Headline, SectionSpacingBottom, ProgressBar } from '@mp-workspace/ui-penguin-ui-material-ui-extension';
import Scrollbar from "@mp-workspace/ui-penguin-ui-scrollbar";
import HeadDescriptionMetaTag from '@mp-workspace/ui-next-description-meta-tag';
import HeadTitle from '@mp-workspace/ui-next-title-meta-tag';
import HeadKeywords from '@mp-workspace/ui-next-keywords-meta-tag';
import Navbar from '../Navbar';
import ButtonSquare from '../../components/ButtonSquare';
import NavbarDivider from '../../components/NavbarDivider';
import ScrollbarBooks, { scrollbarBooksFragment } from '../ScrollbarBooks';
import PopularManga, { popularBooksFragment } from './PopularManga';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('containers:Index');

const linearProgress = <ProgressBar />;

const HOME_PAGE_QUERY = gql`
  query HOME_PAGE_QUERY($afterNewReleaseBooks: String, $afterActionBooks: ID, $afterComedyBooks: ID, $skipAdventureBooks: Boolean = false, $skipBooks: Boolean = false, $skipActionBooks: Boolean = false, $skipComedyBooks: Boolean = false, $skipPopularBooks: Boolean = false) {

    home_page_adventure_books: findBookByCategory(category: "adventure", first: 12) @skip(if: $skipAdventureBooks) {
      edges {
        ...ScrollbarBooksFragment
      }
    }

    home_page_new_release_books: books(first: 10, after: $afterNewReleaseBooks) @skip(if: $skipBooks) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        _id
        ...ScrollbarBooksFragment
      }
    }

    home_page_action_books: findBookByCategory(category: "action", first: 10, after: $afterActionBooks) @skip(if: $skipActionBooks) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        ...ScrollbarBooksFragment
      }
    }

    home_page_comedy_books: findBookByCategory(category: "fantasy", first: 10, after: $afterComedyBooks) @skip(if: $skipComedyBooks) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        ...ScrollbarBooksFragment
      }
    }

    home_page_popular_books: books(last: 12, orderBy: { field: CREATED_AT }) @skip(if: $skipPopularBooks) {
      edges {
        _id
        ...PopularBooksFragment
      }
    }
  }
  ${scrollbarBooksFragment}
  ${popularBooksFragment}
`;

const useStyles = makeStyles((theme: Theme) => ({
  tag: {
    margin: `0 ${theme.spacing(1)}px`,
  },

  scrollbar: {
    margin: `0 -${theme.spacing(2)}px`,
    [theme.breakpoints.up('md')]: {
      margin: `0 -${theme.spacing(4)}px`,
    },

    '& .title': {
      padding: `0 ${theme.spacing(1)}px`,
      [theme.breakpoints.up('md')]: {
        padding: `0 ${theme.spacing(4)}px`,
      },
    }
  },

  scroller: {
    padding: `0 ${theme.spacing(0.5)}px`,
    [theme.breakpoints.up('md')]: {
      padding: `0 ${theme.spacing(2)}px`,
    },
  }
}), {
  name: 'IndexPage'
});

export const Index = () => {
  debug('render');

  const classes = useStyles({});

  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    HOME_PAGE_QUERY,
    {
      variables: {},
      // Setting this value to true will make the component rerender when
      // the "networkStatus" changes, so we are able to know if it is fetching
      // more data
      notifyOnNetworkStatusChange: true,
    }
  );

  const loadingMorePosts = networkStatus === NetworkStatus.fetchMore;

  function nextActionBooks() {
    if(get(data, 'home_page_action_books.pageInfo.hasNextPage', false)) {
      fetchMore({
        variables: {
          afterActionBooks: get(data, 'home_page_action_books.pageInfo.endCursor', null),
          skipBooks: true,
          skipAdventureBooks: true,
          skipComedyBooks: true,
          skipPopularBooks: true
        }
      });
    }
  }

  function nextNewReleaseBooks() {
    if(get(data, 'home_page_new_release_books.pageInfo.hasNextPage', false)) {
      fetchMore({
        variables: {
          afterNewReleaseBooks: get(data, 'home_page_new_release_books.pageInfo.endCursor', null),
          skipAdventureBooks: true,
          skipActionBooks: true,
          skipComedyBooks: true,
          skipPopularBooks: true
        }
      });
    }
  }

  function nextComedyBooks() {
    if(get(data, 'home_page_comedy_books.pageInfo.hasNextPage', false)) {
      fetchMore({
        variables: {
          afterComedyBooks: get(data, 'home_page_comedy_books.pageInfo.endCursor', null),
          skipAdventureBooks: true,
          skipActionBooks: true,
          skipBooks: true,
          skipPopularBooks: true
        }
      });
    }
  }

  function nextAdventure() {}

  return (<>
    <HeadDescriptionMetaTag />
    <HeadTitle />
    <HeadKeywords />
    {loading && linearProgress}
    <Navbar>
      <NavbarDivider />
    </Navbar>
    <Content top={64} bottom={128}>
      <Section>
        <ScrollbarBooks
          id="scrollbar-adventure-books"
          data={get(data, 'home_page_adventure_books.edges', [])}
          label="Recommended for you"
          subheader="Based on your reading history"
          hasMore={false}
          onBottom={nextAdventure}
        />

        <ScrollbarBooks
          id="scrollbar-new-release-books"
          data={get(data, 'home_page_new_release_books.edges', [])}
          label="New release"
          hasMore={get(data, 'home_page_new_release_books.pageInfo.hasNextPage', false)}
          style={{
            backgroundColor: '#008F8E'
          }}
          onBottom={nextNewReleaseBooks}
        />

        <ScrollbarBooks
          id="scrollbar-action-books"
          data={get(data, 'home_page_action_books.edges', [])}
          slug="action"
          label="Action manga"
          hasMore={get(data, 'home_page_action_books.pageInfo.hasNextPage', false)}
          onBottom={nextActionBooks}
        />

        <ScrollbarBooks
          id="scrollbar-comedy-books"
          data={get(data, 'home_page_comedy_books.edges', [])}
          slug="comedy"
          label="Comedy manga"
          hasMore={get(data, 'home_page_comedy_books.pageInfo.hasNextPage', false)}
          onBottom={nextComedyBooks}
        />

        <SectionSpacingBottom />
        <PopularManga
          data={get(data, 'home_page_popular_books.edges', [])}
          // hasMore={get(data, 'home_page_popular_books.pageInfo.hasNextPage', false)}
        />

        <SectionSpacingBottom />
        <Headline>Explore Manga</Headline>
        <SectionSpacingBottom />

        <Scrollbar className={classes.scrollbar} classes={{
          scroller: classes.scroller
        }} allowScrollButtonsMobile>

          <Link href="/browse?t=genres">
            <a aria-label={`View genres page`}>
              <ButtonSquare
                size="large"
                color="primary"
                variant="outlined"
                // component="a"
                // href="/browse?t=genres"
                className={classes.tag}
                startIcon={<BookIcon />}>Genres</ButtonSquare>
            </a>
          </Link>
          {/* <ButtonSquare
            size="large"
            color="primary"
            variant="outlined"
            component="a"
            href="#top-selling"
            className={classes.tag}
            startIcon={<StarIcon />}>Top selling</ButtonSquare> */}
          <Link href="/browse?t=new-releases">
            <a aria-label={`View new releases manga`}>
              <ButtonSquare
                size="large"
                color="primary"
                variant="outlined"
                // component="a"
                // href="#new-releases"
                className={classes.tag}
                startIcon={<NewReleasesIcon />}>New releases</ButtonSquare>
            </a>
          </Link>
        </Scrollbar>

      </Section>
    </Content>
  </>);
};

if (process.env.NODE_ENV !== 'production') {
  Index.displayName = 'containers__Index';
}

Index.defaultProps = {};

export default Index;
