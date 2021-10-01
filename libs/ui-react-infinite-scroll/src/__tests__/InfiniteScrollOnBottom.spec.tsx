import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import InfiniteScrollOnBottom from '../InfiniteScrollOnBottom';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const nonFunc = () => {};
describe('InfiniteScrollOnBottom', () => {
  it('renders .infinite-scroll-component', () => {
    const { baseElement, getByText } = render(
      <InfiniteScrollOnBottom
        orientation="vertical"
        next={nonFunc}
      >
        <div>test</div>
      </InfiniteScrollOnBottom>
    );
    expect(baseElement).toBeTruthy();
    expect(getByText('test')).toBeInTheDocument();
    expect(baseElement).toMatchSnapshot();
  });
});
