import * as React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import ProductName from './ProductName';

describe('ProductName', () => {
  it('should render successfully', () => {
    const { baseElement, getByText } = render(<ProductName title="test" />);
    expect(getByText('test')).toBeInTheDocument();
    // Snapshot demo
    expect(baseElement).toMatchSnapshot();
  });
});
