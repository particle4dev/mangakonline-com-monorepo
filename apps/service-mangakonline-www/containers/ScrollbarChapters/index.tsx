import * as React from 'react';
import gql from 'graphql-tag';
import Link from 'next/link';
import { get } from 'dot-prop';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Typography from '@material-ui/core/Typography';
import { WithStyles, createStyles, withStyles, Theme } from '@material-ui/core';
import { Headline, SectionSpacingBottom, GridScreen } from '@mp-workspace/ui-penguin-ui-material-ui-extension';
import Scrollbar from "@mp-workspace/ui-penguin-ui-scrollbar";
import Book from '../../components/Book';
import BookHeader from '../../components/BookHeader';
import BookCover from '../../components/BookCover';
import loadingBook from '../../components/LoadingBook';
import { ScrollbarChaptersFragment } from './__generated__/ScrollbarChaptersFragment';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('containers:HomePageContent:ScrollbarChapters');

export const scrollbarChaptersFragment = gql`
  fragment ScrollbarChaptersFragment on LibraryChapterEntity {
    _id
    slug
    title
    number
    cover {
      _id
      alt
      sizes {
        url
      }
    }
  }
`;

const styles = (theme: Theme) => createStyles({
  root: {
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
});

const nameid = 'scrollbar-chapters';

export type ScrollbarChaptersProps = WithStyles<typeof styles> & {
  label: string;
  slug?: string;
  loading?: boolean;
  data?: ScrollbarChaptersFragment[];
  style?: React.CSSProperties;
};

const ScrollbarChapters = React.forwardRef(function ScrollbarChapters(props: ScrollbarChaptersProps, ref: React.Ref<HTMLDivElement>) {
  debug('render');

  const { classes, slug, label, style, data, loading = false, ...other } = props;

  return (<div ref={ref} className={classes.root} style={style} {...other}>
    <SectionSpacingBottom />

    <Headline className="title" action={
      slug && (<Link href="/genres/[id]" as={`/genres/${slug}`}>
        <a>
          <IconButton aria-label="forward" size="small" color="primary">
            <ArrowForwardIcon />
          </IconButton>
        </a>
      </Link>)
    }>{label}</Headline>
    <SectionSpacingBottom />

    <Scrollbar classes={{
      scroller: classes.scroller
    }} allowScrollButtonsMobile>
      {data && data.map((e: ScrollbarChaptersFragment, k: number) => (
        <GridScreen xs={6} sm={3} md={2} key={`${nameid}-${slug}-${k}`} className={classes.book}>
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

      {loading && <GridScreen xs={6} sm={3} md={2} key={`${nameid}-loading`} className={classes.book}>
        {loadingBook}
      </GridScreen>}
    </Scrollbar>

  </div>);
});

if (process.env.NODE_ENV !== 'production') {
  ScrollbarChapters.displayName = 'containers__ScrollbarChapters';
}

ScrollbarChapters.defaultProps = {};

export default withStyles(styles, {name: 'ScrollbarChapters'})(React.memo(ScrollbarChapters));
