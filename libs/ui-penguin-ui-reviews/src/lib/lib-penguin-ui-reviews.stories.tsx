import React from 'react';
import {
  LibPenguinUiReviews,
  LibPenguinUiReviewsProps,
} from './lib-penguin-ui-reviews';

export default {
  component: LibPenguinUiReviews,
  title: 'LibPenguinUiReviews',
};

export const primary = () => {
  /* eslint-disable-next-line */
  const props: LibPenguinUiReviewsProps = {};

  return <LibPenguinUiReviews />;
};
