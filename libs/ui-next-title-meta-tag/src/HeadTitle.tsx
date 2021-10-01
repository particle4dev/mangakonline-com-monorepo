// The HTML <title> element is used to provide a title for an HTML document.
import * as React from 'react';
import NextHead from 'next/head';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('ui-next-title-meta-tag:HeadTitle');

export type HeadTitleProps = {
  title?: string
}

function HeadTitle({ title }: HeadTitleProps) {
  debug('render');

  return (
    <NextHead>
      <title>{title}</title>
    </NextHead>
  );
}

if (process.env.NODE_ENV !== 'production') {
  HeadTitle.displayName = 'ui_next_title_meta_tag__HeadTitle';
}

HeadTitle.defaultProps = {
  title: process.env.NEXT_PUBLIC_SITE_TITLE
};

export default React.memo(HeadTitle);
