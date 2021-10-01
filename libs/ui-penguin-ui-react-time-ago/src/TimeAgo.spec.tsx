import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';

import TimeAgo from './TimeAgo';

describe('TimeAgo', () => {
  test('just now', () => {
    render(<TimeAgo date={new Date()} />);
    expect(screen.getByText('a few seconds ago')).toBeInTheDocument();
  });

  test('a few seconds ago', () => {
    render(<TimeAgo date={Date.now() - 1000} />);
    expect(screen.getByText('a few seconds ago')).toBeInTheDocument();
  });

  test('a few seconds ago', () => {
    render(<TimeAgo date={Date.now() - 2000} />);
    expect(screen.getByText('a few seconds ago')).toBeInTheDocument();
  });

  test('a minute ago', () => {
    render(<TimeAgo date={Date.now() - 1000 * 60} />);
    expect(screen.getByText('a minute ago')).toBeInTheDocument();
  });

  test('2 minutes ago', () => {
    render(<TimeAgo date={Date.now() - 2000 * 60} />);
    expect(screen.getByText('2 minutes ago')).toBeInTheDocument();
  });

  test('an hour ago', () => {
    render(<TimeAgo date={Date.now() - 1000 * 60 * 60} />);
    expect(screen.getByText('an hour ago')).toBeInTheDocument();
  });

  test('2 hours ago', () => {
    render(<TimeAgo date={Date.now() - 2000 * 60 * 60} />);
    expect(screen.getByText('2 hours ago')).toBeInTheDocument();
  });

  test('a day ago', () => {
    render(<TimeAgo date={Date.now() - 1000 * 60 * 60 * 24} />);
    expect(screen.getByText('a day ago')).toBeInTheDocument();
  });

  test('7 days ago', () => {
    render(
      <TimeAgo date={Date.now() - 1000 * 60 * 60 * 24 * 7} />,
    );
    expect(screen.getByText('7 days ago')).toBeInTheDocument();
  });
});
