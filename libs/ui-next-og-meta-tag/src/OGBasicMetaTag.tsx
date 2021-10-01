import * as React from 'react';
import NextHead from 'next/head';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('ui-next-open-graph-meta-tag:OGBasicMetaTag');

type OGBasicMetaTagProps = {
  type?: string;
  description?: string;
  title?: string;
  locale?: string;
  url: string;
  image: string;
}

function OGBasicMetaTag({ description, title, locale, url, image, type }: OGBasicMetaTagProps) {
  debug('render');

  return (
    <NextHead>
      <meta property="og:locale" content={locale} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta name="og:description" content={description} />
      <meta name="og:url" content={url} />
      <meta name="og:image" content={image} />
    </NextHead>
  );
}

if (process.env.NODE_ENV !== 'production') {
  OGBasicMetaTag.displayName = 'ui_next_open_graph_meta_tag__OGBasicMetaTag';
}

OGBasicMetaTag.defaultProps = {
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
  title: process.env.NEXT_PUBLIC_SITE_TITLE,
  type: 'website',
  locale: 'en_US'
};

export default React.memo(OGBasicMetaTag);
