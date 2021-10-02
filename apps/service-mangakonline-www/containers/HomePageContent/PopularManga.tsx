import * as React from 'react';
import gql from 'graphql-tag';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core//Typography';
import { get } from 'dot-prop';
import { Headline, SectionSpacingBottom } from '@mp-workspace/ui-penguin-ui-material-ui-extension';
import Book from '../../components/Book';
import BookHeader from '../../components/BookHeader';
import BookCover from '../../components/BookCover';
// import loadingBook from '../../components/LoadingBook';
import { PopularBooksFragment } from './__generated__/PopularBooksFragment';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('containers:HomePageContent:PopularManga');

export const popularBooksFragment = gql`
  fragment PopularBooksFragment on LibraryBookEntity {
    _id
    title
    slug
    totalChapters
    cover {
      _id
      findSize(type: "SMALL") {
        url
      }
    }
  }
`;

const nameid = 'popular-manga';

export type PopularMangaProps = {
  data?: PopularBooksFragment[];
  // loading?: boolean;
  // hasMore?: boolean;
};

function PopularManga({ data }: PopularMangaProps) {
  debug('render');

  const isFirstRun = React.useRef(true);

  React.useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
    }
  }, []);

  return (<>
    <Headline>Popular Manga</Headline>
    <SectionSpacingBottom />

    <Grid spacing={3} container>
      {data.map((e: PopularBooksFragment, k: number) => (
        <Grid item xs={4} sm={3} md={2} key={`${nameid}-${k}`}>
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
      {/*
      {(hasMore || isFirstRun) && <Grid item xs={4} sm={3} md={2} key={`${nameid}-loading`}>
        {loadingBook}
      </Grid>}
      {loading && <Grid item xs={4} sm={3} md={2} key={`${nameid}-loading`}>
        {loadingBook}
      </Grid>} */}
    </Grid>
  </>);
};

if (process.env.NODE_ENV !== 'production') {
  PopularManga.displayName = 'containers__HomePageContent_PopularManga';
}

PopularManga.defaultProps = {};

export default React.memo(PopularManga);
