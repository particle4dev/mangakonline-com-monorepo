import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

const debug = require('debug')('product-page:components:Review:ThumbnailReview');

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: '12px 0',

    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 5,
    cursor: 'pointer',
    display: 'block',
    outline: 'none',
    overflow: 'hidden',
    padding: 3,
    position: 'relative',
    textAlign: 'center',
    verticalAlign: 'middle'
  },

  root__img: {
    display: 'inline-block',
    maxHeight: '100%',
    maxWidth: '100%',
    position: 'relative',
    top: '50%',
    transform:' translateY(-50%)'
  }
}));

type IThumbnailReviewProps = {
  size: number;
  src: string;
}

function ThumbnailReview(props: IThumbnailReviewProps) {
  debug('render');

  const {size, src} = props;

  const classes = useStyles({});

  return (
    <div
      className={classes.root}
      style={{
        width: size,
        height: size,
      }}
      aria-label="Xem hình ảnh"
      role="button" tabIndex={0}>
      <img src={src}
        alt=""
        data-atf="1"
        className={classes.root__img}
      />
    </div>
  );
}

if (process.env.NODE_ENV !== 'production') {
  ThumbnailReview.displayName = 'containers__ThumbnailReview';
}

ThumbnailReview.defaultProps = {};

export default React.memo(ThumbnailReview);
