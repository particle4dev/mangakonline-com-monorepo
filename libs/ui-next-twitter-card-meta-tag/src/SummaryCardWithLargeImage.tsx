// https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/summary-card-with-large-image
import * as React from 'react';
import NextHead from 'next/head';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('ui-next-twitter-card-meta-tag:SummaryCardWithLargeImage');

export type SummaryCardWithLargeImageProps = {
  title?: string
}

function SummaryCardWithLargeImage({ title }: SummaryCardWithLargeImageProps) {
  debug('render');

  return (
    <NextHead>
      <meta name="twitter:card" content="summary_large_image" />



    </NextHead>
  );
}

if (process.env.NODE_ENV !== 'production') {
  SummaryCardWithLargeImage.displayName = 'ui_next_twitter_card_meta_tag__SummaryCardWithLargeImage';
}

SummaryCardWithLargeImage.defaultProps = {};

export default React.memo(SummaryCardWithLargeImage);
