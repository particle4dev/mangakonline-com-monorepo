import * as React from 'react';
import { withKnobs, boolean, select } from "@storybook/addon-knobs";
import Scrollbar from './Scrollbar';

export default {
  title: "Scrollbar",
  decorators: [withKnobs]
};

type BoxProps = {
  key: number;
  index: number;
  label: string | number;
};

const Box = (props: BoxProps) => {
  return <div elevation={3} style={{
    width: 200,
    height: 200,
    maxWidth: 200,
    minWidth: 200,
    position: 'relative',
  }}>
    <div style={{
      margin: 10,
      background: `hsla(${props.index * 60}, 100%, 50%, 0.7)`,
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      border: '2px solid black',
      lineHeight: '180px',
      fontSize: '40px',
      fontWeight: 'bold',
      textAlign: 'center',
      color: 'white'
    }}>{props.label}</div>
  </div>;
};

export const Horizontal = () => <div style={{
  maxWidth: 700
}}>
  <Scrollbar visibleScrollbar={boolean('visibleScrollbar', false)} scrollButtons={select('scrollButtons', {
    Auto: 'auto',
    True: true,
    False: false,
  }, 'auto')}>
    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((e: number) => (
      <Box key={e} label={e} index={e} />
    ))}
  </Scrollbar>
</div>;

export const Vertical = () => <div style={{
  maxHeight: 300,
  flexGrow: 1,
  display: 'flex',
}}>
  <Scrollbar orientation="vertical" visibleScrollbar={boolean('visibleScrollbar', false)} scrollButtons={select('scrollButtons', {
    Auto: 'auto',
    True: true,
    False: false,
  }, 'auto')}>
    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((e: number) => (
      <Box key={e} label={e} index={e} />
    ))}
  </Scrollbar>
</div>;
