import * as React from 'react';
import Link from 'next/link';
import CardActionArea from '@material-ui/core/CardActionArea';
import { withStyles, createStyles } from '@material-ui/core/styles';
import Card, { CardProps } from '@material-ui/core/Card';

export type BookProps = CardProps & {
  href?: string,
  as?: string
};

const Book = withStyles(() =>
  createStyles({
    root: {
      background: 'none'
    }
  }),
)(({children, href, as, ...other}: BookProps) => href ? <Link href={href} as={as}>
  <a style={{
    textDecoration: 'none'
  }}>
    <Card elevation={0} {...other}>
      <CardActionArea>{children}</CardActionArea>
    </Card>
  </a>
</Link> : <Card elevation={0} {...other}>
  <CardActionArea>{children}</CardActionArea>
</Card>);

if (process.env.NODE_ENV !== 'production') {
  Book.displayName = 'components__Book';
}

Book.defaultProps = {};

export default Book;
