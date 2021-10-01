import * as React from 'react';
import { HideOnScroll, Content } from '@mp-workspace/ui-penguin-ui-material-ui-extension';
import ProductDetailSection from '../../components/ProductDetailSection';
import SpecsSection from '../../components/SpecsSection';
import FAQSection from '../../components/FAQSection';
import ReviewsSection from '../../components/ReviewsSection';
import FormSection from '../../components/FormSection';
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

      <ProductDetailSection />
      <SpecsSection />
      <FAQSection />
      <ReviewsSection />
      <FormSection />
    </Content>
  </>);
};

if (process.env.NODE_ENV !== 'production') {
  ItemIdPageContent.displayName = 'containers__ItemIdPageContent';
}

ItemIdPageContent.defaultProps = {};

export default ItemIdPageContent;
