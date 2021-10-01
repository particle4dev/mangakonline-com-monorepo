import * as React from 'react';
import truncate from 'lodash/truncate';
import NextHead from 'next/head';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('ui-next-description-meta-tag:HeadDescriptionMetaTag');

export type HeadDescriptionMetaTagProps = {
  description?: string
}

function HeadDescriptionMetaTag({ description }: HeadDescriptionMetaTagProps) {
  debug('render');

  // https://moz.com/learn/seo/meta-description
  const content = truncate(description, {
    'length': 170,
  });

  return (
    <NextHead>
      <meta property="description" content={content} />
      <meta name="description" content={content} />
      {/**The Schema version (itemProp="description") was for social media tagging.*/}
      <meta itemProp="description" content={content} />
    </NextHead>
  );
}

if (process.env.NODE_ENV !== 'production') {
  HeadDescriptionMetaTag.displayName = 'ui_next_description_meta_tag__HeadDescriptionMetaTag';
}

HeadDescriptionMetaTag.defaultProps = {
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION
};

export default React.memo(HeadDescriptionMetaTag);
