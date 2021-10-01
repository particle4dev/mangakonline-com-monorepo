import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';

import DateFormat from './DateFormat';

describe('DateFormat', () => {
  test('8:49 AM', () => {
    render(<DateFormat value={"2020-12-27T08:49:18.868Z"} format="h:mm A" />);
    expect(screen.getByText('8:49 AM')).toBeInTheDocument();
  });

  test('8:49:18 AM', () => {
    render(<DateFormat value={"2020-12-27T08:49:18.868Z"} format="h:mm:ss A" />);
    expect(screen.getByText('8:49:18 AM')).toBeInTheDocument();
  });
});
