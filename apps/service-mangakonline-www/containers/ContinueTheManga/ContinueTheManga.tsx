import * as React from 'react';
import gql from 'graphql-tag';
import { get } from 'dot-prop';
import { useLazyQuery } from '@apollo/client';
import handleViewport from 'react-in-viewport';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Typography from '@material-ui/core/Typography';
import { SectionSpacingBottom, Headline, GridScreen, PlaceholderRect, PlaceholderDelay, PlaceholderLine } from '@mp-workspace/ui-penguin-ui-material-ui-extension';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Scrollbar from "@mp-workspace/ui-penguin-ui-scrollbar";
import Book from '../../components/Book';
import BookHeader from '../../components/BookHeader';
import BookCover from '../../components/BookCover';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('containers:ContinueTheMangaProps');

export const CONTINUE_THE_MANGA_QUERY = gql`
  query CONTINUE_THE_MANGA_QUERY ($slug: String!) {
    chapters: findChapterByBookSlug(slug: $slug, first: 10) {
      edges {
        slug
        title
        number
        cover {
          alt
          sizes {
            url
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
        total
      }
    }
  }
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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

    book: {
      padding: `0 ${theme.spacing(1.5)}px`,
    },

    scroller: {
      padding: `0 ${theme.spacing(0.5)}px`,
      [theme.breakpoints.up('md')]: {
        padding: `0 ${theme.spacing(2)}px`,
      },
    }
  }),
);

type ContinueTheMangaProps = {
  slug: string;
  inViewport: boolean;
  forwardedRef: React.Ref<HTMLDivElement>;
}

const ContinueTheManga = ({ slug, inViewport, forwardedRef }: ContinueTheMangaProps) => {
  debug('render');

  const classes = useStyles();

  const [getData, { loading, data }] = useLazyQuery(CONTINUE_THE_MANGA_QUERY);

  const isFirstRun = React.useRef(false);

  React.useEffect(() => {
    if (!isFirstRun.current && inViewport) {
      isFirstRun.current = true;
      getData({
        variables: {
          slug
        }
      });
    }
  }, [inViewport]);

  return (<div ref={forwardedRef}>
    <Headline action={
      <IconButton aria-label="forward" size="small" color="primary">
        <ArrowForwardIcon />
      </IconButton>
    }>Continue the manga</Headline>

    <SectionSpacingBottom />

    <Scrollbar className={classes.scrollbar} classes={{
      scroller: classes.scroller
    }} allowScrollButtonsMobile>
      {/* {!isFirstRun.current && loading && [1, 2, 3, 4, 5, 6, 7].map((k: number) => (

      ))} */}
      {get(data, 'chapters.edges', []).map((e: any, k: number) => (
        <GridScreen xs={4} sm={3} md={2} key={`recommended-gridscreen-${k}`} className={classes.book}>
          <Book href="/chapter/[id]" as={`/chapter/${e.slug}`} style={{
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
                {`Chapter #${get(e, 'number', '?')}`}
              </Typography>
            } />
          </Book>
        </GridScreen>
      ))}
      <GridScreen xs={4} sm={3} md={2} key={`recommended-gridscreen-last-element`} className={classes.book}>
        <Book style={{
          width: '100%'
        }}>
          <PlaceholderDelay>
            <PlaceholderRect style={{
              height: 0,
              paddingTop: '131.32%',
              width: '100%'
            }} />
            <BookHeader disableTypography title={<PlaceholderLine width={90} />} />
          </PlaceholderDelay>
        </Book>
      </GridScreen>
    </Scrollbar>
  </div>);
};

if (process.env.NODE_ENV !== 'production') {
  ContinueTheManga.displayName = 'containers__ContinueTheManga';
}

ContinueTheManga.defaultProps = {};

export default handleViewport(React.memo(ContinueTheManga));
