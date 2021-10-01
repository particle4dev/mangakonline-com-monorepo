import * as React from 'react';
import NextHead from 'next/head';
import uniqWith from 'lodash/uniqWith';
import isEqual from 'lodash/isEqual';
import toLower from 'lodash/toLower';

const debug = require('debug')('ui-next-keywords-meta-tag:HeadKeywordsMetaTag');

type HeadKeywordsMetaTagProps = {
  keywords?: string[];
}

function HeadKeywordsMetaTag({keywords}: HeadKeywordsMetaTagProps) {
  debug('render')
  const k = uniqWith(keywords, isEqual);
  return (
    <NextHead>
      <meta name="keywords" content={toLower(k.join(', '))} />
    </NextHead>
  );
}

if (process.env.NODE_ENV !== 'production') {
  HeadKeywordsMetaTag.displayName = 'ui_next_keywords_meta_tag__HeadKeywordsMetaTag';
}

HeadKeywordsMetaTag.defaultProps = {
  keywords: process.env.NEXT_PUBLIC_SITE_KEYWORDS.split(",").map((e: string) => e.trim())
};

export default React.memo(HeadKeywordsMetaTag);
