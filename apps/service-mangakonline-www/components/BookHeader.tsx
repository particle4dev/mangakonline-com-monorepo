import * as React from 'react';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';
import CardHeader, { CardHeaderProps } from '@material-ui/core/CardHeader';

export type BookHeaderProps = CardHeaderProps & {
  /**
   * The content of the Card Title.
   */
  // title?: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  title?: any;
};

const BookHeader = withStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      padding: `${theme.spacing(2)}px 0`,
    },
  }),
)((props: BookHeaderProps) => <CardHeader {...props} />);

if (process.env.NODE_ENV !== 'production') {
  BookHeader.displayName = 'components__BookHeader';
}

BookHeader.defaultProps = {};

export default BookHeader;
