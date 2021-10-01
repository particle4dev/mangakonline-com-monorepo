import * as React from 'react';
import gql from 'graphql-tag';
import { get } from 'dot-prop';
import {
  Headline,
  SectionSpacingBottom,
} from '@mp-workspace/ui-penguin-ui-material-ui-extension';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { InfiniteScrollOnBottom } from '@mp-workspace/ui-react-infinite-scroll';
import LoadingBook from '../../components/LoadingBook';
import Book from '../../components/Book';
import BookHeader from '../../components/BookHeader';
import BookCover from '../../components/BookCover';
import {
  NewReleasesTabFragment
} from './__generated__/NewReleasesTabFragment';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('containers:BrowsePageContent:NewReleasesTab');

export const newReleasesTabFragment = gql`
  fragment NewReleasesTabFragment on LibraryBookEntity {
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
`;

type NewReleasesTabProps = {
  data: NewReleasesTabFragment[];
  next: () => void;
  hasMore?: boolean;
}

const nameid = 'new-releases-tab';

const NewReleasesTab = ({ data, next, hasMore = false }: NewReleasesTabProps) => {
  debug('render');

  const isFirstRun = React.useRef(true);

  React.useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
    }
  }, []);

  return (<>
    <Headline>New Releases</Headline>
    <SectionSpacingBottom />
    <Grid container spacing={3}>
      <InfiniteScrollOnBottom orientation="vertical" next={next}>
        {data.map((e: NewReleasesTabFragment, k: number) => (
          <Grid item xs={6} sm={3} md={2} key={`${nameid}-${k}`}>
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
        {(hasMore || isFirstRun.current) && [1, 2, 3, 4, 5, 6].map((k: number) => (
          <Grid item xs={6} sm={3} md={2} key={`${nameid}-${k}-loading`}>
            {LoadingBook}
          </Grid>
        ))}
      </InfiniteScrollOnBottom>
    </Grid>
  </>);
};

if (process.env.NODE_ENV !== 'production') {
  NewReleasesTab.displayName = 'containers__BrowsePageContent_NewReleasesTab';
}

NewReleasesTab.defaultProps = {};

export default React.memo(NewReleasesTab);
