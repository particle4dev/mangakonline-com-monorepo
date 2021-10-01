import * as React from 'react';
import Typography from '@material-ui/core//Typography';
import Book from './Book';
import BookHeader from './BookHeader';
import BookCover from './BookCover';

export default {
  component: Book,
  title: 'Book',
};

export const Basic = () => {
  return <Book style={{
    maxWidth: 250
  }}>
    <BookCover
      style={{
        height: 0,
        paddingTop: '131.32%',
      }}
      image="https://thumb.mghubcdn.com/rm/martial-peak.jpg"
      title="Breathless"
    />
    <BookHeader disableTypography title={
      <Typography noWrap>
        Breathless
      </Typography>
    } subheader="$7.99" />
  </Book>;
};
