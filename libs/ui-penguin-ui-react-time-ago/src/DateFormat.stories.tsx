import React from 'react';
import DateFormat, {
  DateFormatProps,
} from './DateFormat';

export default {
  component: DateFormat,
  title: 'DateFormat',
};

export const basic = () => {
  const props: DateFormatProps = {
    value: new Date()
  };

  return <>
    <DateFormat value={new Date()} />
    <br />
    h:mm A: <DateFormat value={new Date()} format="h:mm A" />
    <br />
    h:mm:ss A: <DateFormat value={new Date()} format="h:mm:ss A" />
  </>;
};
