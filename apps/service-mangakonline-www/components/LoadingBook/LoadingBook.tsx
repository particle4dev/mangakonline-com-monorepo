import * as React from 'react';
import { PlaceholderRect, PlaceholderDelay, PlaceholderLine } from '@mp-workspace/ui-penguin-ui-material-ui-extension';
import Book from '../../components/Book';
import BookHeader from '../../components/BookHeader';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('components:LoadingBook');

function LoadingBook() {
  debug('render');

  return (<Book style={{
    width: '100%'
  }}>
    <PlaceholderDelay>
      <PlaceholderRect style={{
        height: 0,
        paddingTop: '131.32%',
        width: '100%'
      }} />
      <BookHeader disableTypography title={<PlaceholderLine width={90} style={{
        margin: 0
      }}/>} subheader={<PlaceholderLine width={60} />} />
    </PlaceholderDelay>
  </Book>);
}

if (process.env.NODE_ENV !== 'production') {
  LoadingBook.displayName = 'components__LoadingBook';
}

LoadingBook.defaultProps = {};

export default React.memo(LoadingBook);
