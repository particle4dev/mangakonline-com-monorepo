import * as React from 'react';
import NextHead from 'next/head';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('ui-next-twitter-card-meta-tag:BasicCard');

export type BasicCardProps = {
  site?: string
}

function BasicCard({ site }: BasicCardProps) {
  debug('render');

  return (
    <NextHead>
      {site && <meta name="twitter:site" content={`@${site}`} />}
    </NextHead>
  );
}

if (process.env.NODE_ENV !== 'production') {
  BasicCard.displayName = 'ui_next_twitter_card_meta_tag__BasicCard';
}

BasicCard.defaultProps = {
  site: process.env.NEXT_PUBLIC_TWITTER_ACCOUNT
};

export default React.memo(BasicCard);
