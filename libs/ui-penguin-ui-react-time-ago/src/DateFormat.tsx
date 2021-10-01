import * as React from "react";
import dayjs from 'dayjs';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('@penguin-ui/react-time-ago:DateFormat');

export type DateFormatProps = {
  value: Date | string,
  children?: React.ReactElement | string,
  format?: string,
  className?: string
}

const DateFormat = React.forwardRef(function DateFormat({ children, value, format, className }: DateFormatProps, ref: React.Ref<HTMLElement>) {
  debug('render');

  return (
    <span className={className} ref={ref}>
      {children}
      {dayjs(value).format(format)}
    </span>
  );
});

if (process.env.NODE_ENV !== 'production') {
  DateFormat.displayName = 'penguin-ui_react_time_ago__DateFormat';
}

DateFormat.defaultProps = {
  className: '',
  format: 'ddd, MMM D, YYYY h:mm A'
};

export default DateFormat;
