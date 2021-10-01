// https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/summary
import * as React from 'react';
import NextHead from 'next/head';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('ui-next-twitter-card-meta-tag:SummaryCard');

export type SummaryCardProps = {
  title: string;
  description: string;
  image: string;
}

function SummaryCard({ title, description, image }: SummaryCardProps) {
  debug('render');

  return (
    <NextHead>
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </NextHead>
  );
}

if (process.env.NODE_ENV !== 'production') {
  SummaryCard.displayName = 'ui_next_twitter_card_meta_tag__SummaryCard';
}

SummaryCard.defaultProps = {};

export default React.memo(SummaryCard);
