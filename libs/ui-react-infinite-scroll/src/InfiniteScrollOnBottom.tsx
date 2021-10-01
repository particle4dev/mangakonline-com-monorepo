import * as React from 'react';
import isString from 'lodash/isString';
import throttle from 'lodash/throttle';
import { ThresholdUnits, ThresholdType, parseThreshold } from './utils/threshold';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('ui-react-infinite-scroll:InfiniteScrollOnBottom');

const isElementAtBottom = (clientHeight, scrollTop, scrollHeight, threshold) => {
  if (threshold.unit === ThresholdUnits.Pixel) {
    return scrollTop + clientHeight >= scrollHeight - threshold.value;
  }

  return scrollTop + clientHeight >= scrollHeight * threshold.value / 100;
}

type GetTriggerOption = {
  /**
   * The tabs orientation (layout flow direction).
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
  threshold: ThresholdType;
  /**
   *
   */
  next: () => void;

  event: MouseEvent;
}

function getTrigger(store, { orientation, next, threshold,  event }: GetTriggerOption) {
  const {
    scrollableNode
  } = store.current;

  const target = scrollableNode !== window
        ? (event.target as HTMLElement)
        : document.documentElement.scrollTop
        ? document.documentElement
        : document.body;

  const clientHeight =
    target === document.body || target === document.documentElement
      ? window.screen.availHeight
      : target.clientHeight;

  const clientWidth =
    target === document.body || target === document.documentElement
      ? window.screen.availWidth
      : target.clientWidth;

  const atBottom = orientation === 'vertical' ? isElementAtBottom(clientHeight, target.scrollTop, target.scrollHeight, threshold) : isElementAtBottom(clientWidth, target.scrollLeft, target.scrollWidth, threshold);
  if (atBottom) {
    store.current.actionTriggered = true;
    next();
  }
}

export type InfiniteScrollOnBottomProps = {
  children: React.ReactNode;
  /**
   * The tabs orientation (layout flow direction).
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';

  scrollThreshold?: string | number;

  /**
   *
   */
  next: () => void;

  // Listen scroll event
  scrollableTarget?: Node | Window | string;
}

export type InfiniteScrollOnBottomStore = {
  total?: number;
  scrollableNode?: Node | Window;
  loading?: boolean;
  actionTriggered?: boolean;
}

const InfiniteScrollOnBottom = (props: InfiniteScrollOnBottomProps) => {
  debug('render');

  const {
    children,
    orientation = 'vertical',
    scrollThreshold = 0.8,
    scrollableTarget,
    next
  } = props;

  const store = React.useRef<InfiniteScrollOnBottomStore>({
    total: 0,
    actionTriggered: false
  });

  function getScrollableTarget(scrollableTarget) {
    if (scrollableTarget instanceof HTMLElement)
      return scrollableTarget;
    if (isString(scrollableTarget)) {
      return document.getElementById(scrollableTarget as string);
    }
    if (scrollableTarget === null) {
      console.warn(`You are trying to pass scrollableTarget but it is null. This might
        happen because the element may not have been added to DOM yet.
        See https://github.com/ankeetmaini/react-infinite-scroll-component/issues/59 for more info.
      `);
    }
    return window;
  }

  React.useEffect(() => {
    const total = React.Children.count(children);
    if(store.current.total !== total) {
      store.current.total = total;
      store.current.actionTriggered = false;
    }
    // See Option 3. https://github.com/facebook/react/issues/14476#issuecomment-471199055
  }, [children]);

  React.useEffect(() => {
    const scrollableNode = getScrollableTarget(scrollableTarget);
    store.current.scrollableNode = scrollableNode;

    const threshold: ThresholdType = parseThreshold(scrollThreshold);

    const handleScroll = throttle((event: MouseEvent) => {
      if (store.current.actionTriggered) {
        return;
      }
      getTrigger(store, {
        orientation,
        threshold,
        next,
        event
      });
    }, 150);

    if(scrollableNode) {
      scrollableNode.addEventListener('scroll', handleScroll);
    }

    return () => {
      if(scrollableNode) {
        scrollableNode.removeEventListener('scroll', handleScroll);
      }
    };

    // See Option 3. https://github.com/facebook/react/issuesscrollableNode/14476#issuecomment-471199055
  }, [orientation, scrollThreshold, scrollableTarget, next]);

  return (<>{children}</>);
};

if (process.env.NODE_ENV !== 'production') {
  InfiniteScrollOnBottom.displayName = 'ui_react_infinite_scroll__InfiniteScrollOnBottom';
}

export default React.memo(InfiniteScrollOnBottom);
