// https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/app-card
import * as React from 'react';
import NextHead from 'next/head';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('ui-next-twitter-card-meta-tag:AppCard');

export type AppCardProps = {
  title?: string
}

function AppCard({ title }: AppCardProps) {
  debug('render');

  return (
    <NextHead>
      <meta name="twitter:card" content="app" />



    </NextHead>
  );
}

if (process.env.NODE_ENV !== 'production') {
  AppCard.displayName = 'ui_next_twitter_card_meta_tag__AppCard';
}

AppCard.defaultProps = {};

export default React.memo(AppCard);
