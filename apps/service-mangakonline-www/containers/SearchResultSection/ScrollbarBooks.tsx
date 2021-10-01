import * as React from 'react';
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

// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('containers:ScrollbarBooks');

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

const nameid = 'scrollbar-books';

export type ScrollbarBooksProps = WithStyles<typeof styles> & {
  label: string;
  slug?: string;
  loading?: boolean;
  data?: any;
  style?: React.CSSProperties;
};

const ScrollbarBooks = React.forwardRef(function ScrollbarBooks(props: ScrollbarBooksProps, ref: React.Ref<HTMLDivElement>) {
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
      {data && data.map((e: any, k: number) => (
        <GridScreen xs={6} sm={3} md={2} key={`${nameid}-${slug}-${k}`} className={classes.book}>
          <Book href="/manga/[id]" as={`/manga/${e.slug}`} style={{
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
            }
            />
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
  ScrollbarBooks.displayName = 'containers__ScrollbarBooks';
}

ScrollbarBooks.defaultProps = {};

export default withStyles(styles, {name: 'ScrollbarBooks'})(React.memo(ScrollbarBooks));
