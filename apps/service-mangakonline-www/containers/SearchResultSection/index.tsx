import * as React from 'react';
import gql from 'graphql-tag';
import { get } from 'dot-prop';
import { useLazyQuery } from '@apollo/client';
import debounce from 'lodash/debounce';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core//Typography';
import {
  ProgressBar,
  Section,
  SectionSpacingBottom,
  Headline
} from '@mp-workspace/ui-penguin-ui-material-ui-extension';
import Book from '../../components/Book';
import BookHeader from '../../components/BookHeader';
import BookCover from '../../components/BookCover';
import { selectQueryParams } from '../SearchContext';
import ScrollbarBooks from './ScrollbarBooks';
import { SEARCH_PAGE_QUERY as SEARCH_PAGE_QUERY_TYPE, SEARCH_PAGE_QUERY_chapters_edges } from './__generated__/SEARCH_PAGE_QUERY';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('containers:SearchResultSection');

const linearProgress = <ProgressBar />;

const SEARCH_PAGE_QUERY = gql`
  query SEARCH_PAGE_QUERY($query: String, $limit: Int) {
    mangas: search(query: $query, type: "manga", limit:$limit, offset: 0) {
      edges {
        _id
        slug
        type
        title
        cover {
          _id
          alt
          sizes {
            url
          }
        }
      }
      pageInfo {
        limit
        total
      }
    }

    chapters: search(query: $query, type: "chapter", limit:$limit, offset: 0) {
      edges {
        _id
        slug
        type
        title
        cover {
          _id
          alt
          sizes {
            url
          }
        }
      }
      pageInfo {
        limit
        total
      }
    }
  }
`;

function SearchResultSection() {
  debug(`render`);

  const query = selectQueryParams();

  const [result, setResult] = React.useState(null);

  const [getResult, { loading }] = useLazyQuery(SEARCH_PAGE_QUERY, {
    onCompleted: (data: SEARCH_PAGE_QUERY_TYPE) => {
      setResult(data);
    }
  });

  const throttled = React.useRef(debounce((newValue: string) => {
    getResult({
      variables: {
        query: newValue.trim(),
        limit: 50
      }
    });
  }, 350, {
    trailing: true
  }));

  React.useEffect(() => {
    throttled.current(query.q);
  }, [query.q]);

  const totalMangas = get(result, 'mangas.pageInfo.total', 0);

  const mangas = get(result, 'mangas.edges', []).filter(e => e.type === 'manga');

  const totalChapters = get(result, 'chapters.pageInfo.total', 0);

  const chapters = get(result, 'chapters.edges', []).filter(e => e.type === 'chapter');

  return (
    <>
      {loading && linearProgress}
      <Section>
        {totalMangas !== 0 && <ScrollbarBooks data={mangas} slug="search/mangas" label={`${totalMangas} mangas`} loading={loading} />}

        <SectionSpacingBottom />

        {totalChapters !== 0 && (<>
          <Headline>{totalChapters} chapters</Headline>
          <SectionSpacingBottom />

          <Grid spacing={3} container>
            {chapters.map((e: SEARCH_PAGE_QUERY_chapters_edges, k: number) => (
              <Grid item xs={4} sm={3} md={2} key={`newrelease-gridscreen-${k}`}>
                <Book href={e.type === 'manga' ? '/manga/[id]' : '/chapter/[id]'} as={e.type === 'manga' ? `/manga/${e.slug}` : `/chapter/${e.slug}`} style={{
                  width: '100%'
                }}>
                  <BookCover
                    style={{
                      height: 0,
                      paddingTop: '131.32%',
                    }}
                    image={get(e, 'cover.sizes.0.url', null)}
                    title={e.title}
                  />
                  <BookHeader disableTypography title={
                    <Typography noWrap>
                      {e.title}
                    </Typography>
                  } />
                </Book>
              </Grid>
            ))}
          </Grid>
        </>)}
      </Section>
    </>
  );
}

if (process.env.NODE_ENV !== 'production') {
  SearchResultSection.displayName = 'containers__SearchResultSection';
}

SearchResultSection.defaultProps = {};

export default SearchResultSection;
