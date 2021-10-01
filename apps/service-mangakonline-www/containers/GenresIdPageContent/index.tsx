import * as React from 'react';
import gql from 'graphql-tag';
import { get } from 'dot-prop';
import { useQuery, NetworkStatus } from '@apollo/client';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core//Typography';
import HeadTitle from '@mp-workspace/ui-next-title-meta-tag';
import {
  Content,
  Section,
  ProgressBar,
  HideOnScroll,
} from '@mp-workspace/ui-penguin-ui-material-ui-extension';
import { InfiniteScrollOnBottom } from '@mp-workspace/ui-react-infinite-scroll';
import Book from '../../components/Book';
import BookHeader from '../../components/BookHeader';
import BookCover from '../../components/BookCover';
import loadingBook from '../../components/LoadingBook';
import BackNavbar from '../BackNavbar';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('containers:GenresIdPageContent');

const linearProgress = <ProgressBar />;

const nameid = 'genres-id-page';

const GENRES_ID_PAGE_QUERY = gql`
  query GENRES_ID_PAGE_QUERY($slug: String!, $after: ID, $skipCategory: Boolean = false) {
    genres_id_page_category: findCategoryBySlug(slug: $slug) @skip(if: $skipCategory) {
      _id
      label
    }
    genres_id_page_books: findBookByCategory(category: $slug, first: 18, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        _id
        title
        slug
        totalChapters
        cover {
          _id
          findSize(type: "SMALL") {
            url
            width
            height
            type
          }
        }
      }
    }
  }
`;

type GenresIdPageContentProps = {
  slug: string
}

const GenresIdPageContent = (props: GenresIdPageContentProps) => {
  debug('render');

  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    GENRES_ID_PAGE_QUERY,
    {
      variables: {
        slug: props.slug,
        after: null,
        skipCategory: false
      },
      // Setting this value to true will make the component rerender when
      // the "networkStatus" changes, so we are able to know if it is fetching
      // more data
      notifyOnNetworkStatusChange: true,
    }
  );

  const loadingMorePosts = networkStatus === NetworkStatus.fetchMore;

  const books = get(data, 'genres_id_page_books.edges', []);

  function next() {
    if(get(data, 'genres_id_page_books.pageInfo.hasNextPage', false)) {
      fetchMore({
        variables: {
          slug: props.slug,
          after: get(data, 'genres_id_page_books.pageInfo.endCursor', null),
          skipCategory: true,
        }
      });
    }
  }

  const title = `Manga List - Genres: ${get(data, 'genres_id_page_category.label', '')} - ${process.env.NEXT_PUBLIC_SITE_NAME}`;

  return (
    <>
      <HeadTitle title={title} />
      {loading && linearProgress}
      <HideOnScroll>
        <BackNavbar title={<Typography variant="h6">{get(data, 'genres_id_page_category.label', null)}</Typography>} />
      </HideOnScroll>
      <Content top={64} bottom={64}>
        <Section>
          <Grid spacing={3} container>
            <InfiniteScrollOnBottom orientation="vertical" next={next}>

            {books.map((e, k: number) => (
              <Grid item xs={4} sm={3} md={2} key={`${nameid}-book-${k}`}>
                <Book href="/manga/[id]" as={`/manga/${e.slug}`} style={{
                  width: '100%'
                }}>
                  <BookCover
                    style={{
                      height: 0,
                      paddingTop: '131.32%',
                    }}
                    image={get(e, 'cover.findSize.url', null)}
                    title={e.title}
                  />
                  <BookHeader disableTypography title={
                    <Typography noWrap>
                      {e.title}
                    </Typography>
                  }
                  subheader={`#${e.totalChapters}`}
                  />
                </Book>
              </Grid>
            ))}
            {(loading || get(data, 'genres_id_page_books.pageInfo.hasNextPage', false)) && [1, 2, 3, 4, 5, 6].map(e => (
              <Grid item xs={4} sm={3} md={2} key={`${nameid}-loading-book-${e}`}>
                {loadingBook}
              </Grid>
            ))}
            </InfiniteScrollOnBottom>

          </Grid>
        </Section>
      </Content>
    </>
  );
};

if (process.env.NODE_ENV !== 'production') {
  GenresIdPageContent.displayName = 'containers__GenresIdPageContent';
}

GenresIdPageContent.defaultProps = {};

export default GenresIdPageContent;

// <title>Manga List - Genres: Adventure - Manganelo</title>
// view-source:https://manganelo.com/genre-4
