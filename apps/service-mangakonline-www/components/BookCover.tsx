import * as React from 'react';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';
import CardMedia, { CardMediaProps } from '@material-ui/core/CardMedia';

export type BookCoverProps = CardMediaProps;

const BookCover = withStyles((theme: Theme) =>
  createStyles({

  }),
)((props: BookCoverProps) => <CardMedia {...props} />);

if (process.env.NODE_ENV !== 'production') {
  BookCover.displayName = 'components__BookCover';
}

BookCover.defaultProps = {};

export default BookCover;
