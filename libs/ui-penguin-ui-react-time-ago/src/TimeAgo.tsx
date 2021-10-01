import * as React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('@penguin-ui/react-time-ago:TimeAgo');

export type TimeAgoProps = {
  date: Date | string,
  className?: string,
  style?: React.CSSProperties
};

const TimeAgo = React.forwardRef(function TimeAgo(props: TimeAgoProps, ref: React.Ref<HTMLElement>) {
  debug('render');
  const { date, className, style } = props;
  const d = dayjs(date);

  return (
    <time className={className} style={style} ref={ref}>
      {d.fromNow()}
    </time>
  );
});

if (process.env.NODE_ENV !== 'production') {
  TimeAgo.displayName = 'penguin-ui_react_time_ago__TimeAgo';
}

TimeAgo.defaultProps = {};

export default React.memo(TimeAgo);
