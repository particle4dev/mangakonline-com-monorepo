import * as React from 'react';
import { HideOnScroll, Content } from '@mp-workspace/ui-penguin-ui-material-ui-extension';
import ReviewsSection from '../../components/ReviewsSection';
import Navbar from './Navbar';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('containers:ItemIdPageContent');

const ItemIdPageContent = ({ slug }) => {
  debug('render');

  return (<>
    <HideOnScroll>
      <Navbar />
    </HideOnScroll>
    <Content top={64}>

      <ReviewsSection />
    </Content>
  </>);
};

if (process.env.NODE_ENV !== 'production') {
  ItemIdPageContent.displayName = 'containers__ItemIdPageContent';
}

ItemIdPageContent.defaultProps = {};

export default ItemIdPageContent;
