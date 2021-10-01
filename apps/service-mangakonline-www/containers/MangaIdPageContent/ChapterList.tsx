import * as React from 'react';
import gql from 'graphql-tag';
import { get } from 'dot-prop';
import { WithStyles, createStyles, withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { TimeAgo } from "@mp-workspace/ui-penguin-ui-react-time-ago";
import Book from '../../components/Book';
import BookHeader from '../../components/BookHeader';
import BookCover from '../../components/BookCover';

import { ChaptersBookFragment } from './__generated__/ChaptersBookFragment';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('containers:MangaIdPageContent:ChapterList');

export const chaptersBookFragment = gql`
  fragment ChaptersBookFragment on LibraryChapterEntity {
    _id
    number
    title
    slug
    releaseDate
    cover {
      _id
      alt
      sizes {
        url
      }
    }
    images {
      _id
      alt
      sizes {
        url
        width
        height
        orientation
      }
    }
  }
`;

const styles = () => createStyles({
  root: {
    width: '100%',
    marginTop: -14,
  },
});

export type ChapterListProps = WithStyles<typeof styles> & {
  data?: ChaptersBookFragment[]
}

const ChapterList = React.forwardRef(function ChapterList(props: ChapterListProps, ref: React.Ref<HTMLElement>) {
  debug('render');

  const { classes, data } = props;

  return (
    <Grid container spacing={3} className={classes.root}>
      {data && data.map((e: ChaptersBookFragment, k: number) => (
        <Grid item xs={6} sm={3} md={2} key={`newrelease-gridscreen-${k}`}>
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
            }
            subheader={<TimeAgo date={e.releaseDate} />}
            />
          </Book>
        </Grid>
      ))}
    </Grid>
  );
});

if (process.env.NODE_ENV !== 'production') {
  ChapterList.displayName = 'containers__ChapterList';
}

ChapterList.defaultProps = {};

export default withStyles(styles, {name: 'ChapterList'})(ChapterList);
