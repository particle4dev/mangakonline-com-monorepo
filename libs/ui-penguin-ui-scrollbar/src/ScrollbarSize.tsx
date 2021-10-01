import * as React from 'react';
import debounce from 'lodash/debounce';
import { ownerWindow } from '@material-ui/core/utils';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('@penguin-ui/scrollbar:ScrollbarSize');

const styles = {
  width: 99,
  height: 99,
  position: 'absolute',
  top: -9999,
  overflow: 'scroll',
};

export type ScrollbarSizeProps = {
  onChange: (scrollbarHeight: number) => void,
  className: string,
}
/**
 * The component originates from https://github.com/STORIS/react-scrollbar-size.
 * It has been moved into the core in order to minimize the bundle size.
 */
function ScrollbarSize(props: ScrollbarSizeProps) {
  debug('render');

  const { onChange, ...other } = props;
  const scrollbarHeight = React.useRef<number>();
  const nodeRef = React.useRef(null);

  const setMeasurements = () => {
    scrollbarHeight.current = nodeRef.current.offsetHeight - nodeRef.current.clientHeight;
  };

  React.useEffect(() => {
    // Corresponds to 10 frames at 60 Hz.
    // A few bytes payload overhead when lodash/debounce is ~3 kB and debounce ~300 B.
    // debounce(func, wait = 166)
    const handleResize = debounce(() => {
      const prevHeight = scrollbarHeight.current;
      setMeasurements();

      if (prevHeight !== scrollbarHeight.current) {
        onChange(scrollbarHeight.current);
      }
    }, 166);

    const containerWindow = ownerWindow(nodeRef.current);
    containerWindow.addEventListener('resize', handleResize);
    return () => {
      handleResize.cancel();
      containerWindow.removeEventListener('resize', handleResize);
    };
  }, [onChange]);

  React.useEffect(() => {
    setMeasurements();
    onChange(scrollbarHeight.current);
  }, [onChange]);

  return <div style={{
    width: 99,
    height: 99,
    position: 'absolute',
    top: -9999,
    overflow: 'scroll',
  }} ref={nodeRef} {...other} />;
}

if (process.env.NODE_ENV !== 'production') {
  ScrollbarSize.displayName = 'penguin_ui_scrollbar__ScrollbarSize';
}

ScrollbarSize.defaultProps = {};

export default ScrollbarSize;
