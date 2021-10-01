import React from 'react';
import { render } from '@testing-library/react';

import LibPenguinUiReviews from './lib-penguin-ui-reviews';

describe('LibPenguinUiReviews', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LibPenguinUiReviews />);
    expect(baseElement).toBeTruthy();
  });
});
