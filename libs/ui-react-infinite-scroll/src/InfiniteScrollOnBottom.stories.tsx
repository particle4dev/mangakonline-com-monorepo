// https://github.com/roderickhsiao/react-in-viewport
import * as React from "react";
import Scrollbar from "@mp-workspace/ui-penguin-ui-scrollbar";
import InfiniteScrollOnBottom from './InfiniteScrollOnBottom';

export default {
  component: InfiniteScrollOnBottom,
  title: 'InfiniteScrollOnBottom',
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
      background: `hsla(${props.index * 30}, 100%, 50%, 0.7)`,
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

type InfiniteScrollOnBottomDemo = {
  orientation?: 'horizontal' | 'vertical';
};

const InfiniteScrollOnBottomDemo = ({ orientation = "vertical"}: InfiniteScrollOnBottomDemo) => {
  const [state, setState] = React.useState({
    items: Array.from({ length: 10 }),
    loading: false,
    page: 1
  });

  const next = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    setState(old => ({
      ...old,
      loading: true
    }));

    setTimeout(() => {
      setState(old => ({
        items: old.items.concat(Array.from({ length: 10 })),
        loading: false,
        page: old.page + 1
      }));
    }, 1500);
  };

  return (<Scrollbar orientation={orientation} id="scrollbar_id">
    <InfiniteScrollOnBottom scrollableTarget="scrollbar_id" orientation={orientation} next={next}>
      {state.items.map((e: number, key: number) => (
        <Box key={key} label={key} index={key} />
      ))}
    </InfiniteScrollOnBottom>
  </Scrollbar>);
};

export const Vertical = () => <div style={{
  maxHeight: 400,
  flexGrow: 1,
  display: 'flex',
}}>
  <InfiniteScrollOnBottomDemo />
</div>;

export const Horizontal = () => <div style={{
  maxWidth: 500,
}}>
  <InfiniteScrollOnBottomDemo orientation="horizontal" />
</div>;
