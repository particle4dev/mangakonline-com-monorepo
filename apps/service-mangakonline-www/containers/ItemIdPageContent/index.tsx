import * as React from 'react';
import { HideOnScroll, Content } from '@mp-workspace/ui-penguin-ui-material-ui-extension';
import FAQSection from '../../components/FAQSection';
import ReviewsSection from '../../components/ReviewsSection';
import Navbar from './Navbar';
import DemoCarousel from './DemoCarousel';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('containers:ItemIdPageContent');

const ItemIdPageContent = ({ slug }) => {
  debug('render');

  return (<>
    <HideOnScroll>
      <Navbar />
    </HideOnScroll>
    <Content top={64}>
      <DemoCarousel />

      <FAQSection />
      <ReviewsSection />
    </Content>
  </>);
};

if (process.env.NODE_ENV !== 'production') {
  ItemIdPageContent.displayName = 'containers__ItemIdPageContent';
}

ItemIdPageContent.defaultProps = {};

export default ItemIdPageContent;
