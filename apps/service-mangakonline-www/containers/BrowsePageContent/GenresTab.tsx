import * as React from 'react';
import Link from 'next/link';
import gql from 'graphql-tag';
import { get } from 'dot-prop';
import {
  CollectionCard,
  Headline,
  SectionSpacingBottom,
  PlaceholderRect,
} from '@mp-workspace/ui-penguin-ui-material-ui-extension';
import Grid from '@material-ui/core/Grid';
import { InfiniteScrollOnBottom } from '@mp-workspace/ui-react-infinite-scroll';
import {
  GenresTabFragment
} from './__generated__/GenresTabFragment';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('containers:BrowsePageContent:GenresTab');

export const genresTabFragment = gql`
  fragment GenresTabFragment on CatalogCategoryEntity {
    _id
    label
    slug
    images {
      _id
      filename
      alt
      sizes {
        url
      }
    }
  }
`;

const nameid = 'genres-tab';

type GenresTabProps = {
  data: GenresTabFragment[];
  next: () => void;
  hasMore?: boolean;
}

const GenresTab = ({ data, next, hasMore = false }: GenresTabProps) => {
  debug('render');

  const isFirstRun = React.useRef(true);

  React.useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
    }
  }, []);

  return (<>
    {/* <Headline>Authors</Headline>
    <SectionSpacingBottom /> */}
    <Headline>Categories</Headline>
    <SectionSpacingBottom />
    <Grid container spacing={3}>
      <InfiniteScrollOnBottom orientation="vertical" next={next}>
        {data.map((e: GenresTabFragment, k: number) => (
          <Grid item xs={6} sm={4} md={3} key={`${nameid}-${e.slug}`}>
            <Link href="/genres/[id]" as={`/genres/${e.slug}`}>
              <a>
                <CollectionCard
                  title={e.label}
                  image={get(e, 'images.0.sizes.0.url', null)}
                />
              </a>
            </Link>
          </Grid>
        ))}
        {(hasMore || isFirstRun.current) && [1, 2, 3, 4].map((k: number) => (
          <Grid item xs={6} sm={4} md={3} key={`${nameid}-${k}-loading`}>
            <PlaceholderRect style={{
              height: 0,
              paddingTop: 'calc(56.25%)', // 16:9
              width: '100%'
            }} />
          </Grid>
        ))}
      </InfiniteScrollOnBottom>
    </Grid>
  </>);
};

if (process.env.NODE_ENV !== 'production') {
  GenresTab.displayName = 'containers__BrowsePageContent_GenresTab';
}

GenresTab.defaultProps = {};

export default React.memo(GenresTab);
