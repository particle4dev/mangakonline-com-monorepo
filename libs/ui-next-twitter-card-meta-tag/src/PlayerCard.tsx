// https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/player-card
import * as React from 'react';
import NextHead from 'next/head';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('ui-next-twitter-card-meta-tag:PlayerCard');

export type PlayerCardProps = {
  title?: string
}

function PlayerCard({ title }: PlayerCardProps) {
  debug('render');

  return (
    <NextHead>
      <meta name="twitter:card" content="player" />



    </NextHead>
  );
}

if (process.env.NODE_ENV !== 'production') {
  PlayerCard.displayName = 'ui_next_twitter_card_meta_tag__PlayerCard';
}

PlayerCard.defaultProps = {};

export default React.memo(PlayerCard);
