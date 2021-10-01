import React from 'react';
import TimeAgo, {
  TimeAgoProps,
} from './TimeAgo';

export default {
  component: TimeAgo,
  title: 'TimeAgo',
};

export const basic = () => {
  const props: TimeAgoProps = {
    date: new Date()
  };

  return <TimeAgo date={new Date()} />;
};
