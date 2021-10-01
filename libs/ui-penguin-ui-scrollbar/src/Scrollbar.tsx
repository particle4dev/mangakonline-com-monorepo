import * as React from 'react';
import classnames from "classnames";
import debounce from 'lodash/debounce';
import Zoom from '@material-ui/core/Zoom';
import useEventCallback from '@material-ui/core/utils/useEventCallback';
import { WithStyles, withStyles, createStyles, Theme, useTheme } from "@material-ui/core/styles";
import { getNormalizedScrollLeft, detectScrollType } from '@material-ui/core/utils/scrollLeft';
import ScrollbarButton from "./ScrollbarButton";
import ScrollbarSize from "./ScrollbarSize";
import animate from './utils/animate';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('@penguin-ui/scrollbar:Scrollbar');

export const styles = (theme: Theme) => createStyles({
  /* Styles applied to the root element. */
  root: {
    position: 'relative',
    // overflow: 'hidden',
    minHeight: 48,
    WebkitOverflowScrolling: 'touch', // Add iOS momentum scrolling.
    display: 'flex',
  },
  /* Styles applied to the root element if `orientation="vertical"`. */
  vertical: {
    flexDirection: 'column',
  },
  /* Styles applied to the tablist element. */
  scroller: {
    position: 'relative',
    display: 'inline-block',
    flex: '1 1 auto',
    whiteSpace: 'nowrap',
  },
  /* Styles applied to the tablist element if `orientation="horizontal"`. */
  scrollableX: {
    overflowX: 'auto',
    overflowY: 'hidden',
  },
  /* Styles applied to the tablist element if `orientation="vertical"`. */
  scrollableY: {
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  /* Styles applied to the tablist element if and `visibleScrollbar={false}`. */
  hideScrollbar: {
    // Hide dimensionless scrollbar on MacOS
    scrollbarWidth: 'none', // Firefox
    '&::-webkit-scrollbar': {
      display: 'none', // Safari + Chrome
    },
  },
  /* Styles applied to the flex container element. */
  flexContainer: {
    // display: 'flex',
    display: 'inline-flex',
  },
  /* Styles applied to the flex container element if `orientation="vertical"`. */
  flexContainerVertical: {
    flexDirection: 'column',
  },
  /* Styles applied to the `ScrollButtonComponent` component if `allowScrollButtonsMobile={true}`. */
  scrollButtonsHideMobile: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  /* Styles applied to the `ScrollButtonComponent` component. */
  scrollButtons: {},
});

export type ScrollbarType = WithStyles<typeof styles> & {
  /**
   * The label for the Tabs as a string.
   */
  'aria-label'?: string;
  /**
   * An id or list of ids separated by a space that label the Tabs.
   */
  'aria-labelledby'?: string;
  /**
   * If `true`, the scroll buttons aren't forced hidden on mobile.
   * By default the scroll buttons are hidden on mobile and takes precedence over `scrollButtons`.
   * @default false
   */
  allowScrollButtonsMobile?: boolean;

  children: React.ReactNode;
  className?: string;
  component?: React.ElementType;
  /**
   * The tabs orientation (layout flow direction).
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * If `true`, the scrollbar is visible. It can be useful when displaying
   * a long vertical list of tabs.
   * @default false
   */
  visibleScrollbar?: boolean;
  /**
   * Determine behavior of scroll buttons when tabs are set to scroll:
   *
   * - `auto` will only present them when not all the items are visible.
   * - `true` will always present them.
   * - `false` will never present them.
   *
   * By default the scroll buttons are hidden on mobile.
   * This behavior can be disabled with `allowScrollButtonsMobile`.
   * @default 'auto'
   */
  scrollButtons?: 'auto' | true | false;

  id?: string;
}

const Scrollbar = React.forwardRef(function Scrollbar(props: ScrollbarType, ref: React.Ref<HTMLElement>) {
  debug('render');

  const {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    classes,
    allowScrollButtonsMobile = false,
    children,
    className,
    component: Component = 'div',
    orientation = 'horizontal',
    visibleScrollbar = false,
    scrollButtons = 'auto',

    id,

    ...other
  } = props;

  const theme = useTheme();

  const isRtl = theme.direction === 'rtl';
  const vertical = orientation === 'vertical';
  const clientSize = vertical ? 'clientHeight' : 'clientWidth';
  const scrollStart = vertical ? 'scrollTop' : 'scrollLeft';
  const tabsRef = React.useRef(null);
  const tabListRef = React.useRef(null);

  const [displayScroll, setDisplayScroll] = React.useState({
    start: false,
    end: false,
  });

  const [scrollerStyle, setScrollerStyle] = React.useState({
    overflow: 'hidden',
    scrollbarWidth: 0,
  });

  // TODO Remove <ScrollbarSize /> as browser support for hidding the scrollbar
  // with CSS improves.
  const handleScrollbarSizeChange = React.useCallback((scrollbarWidth: number) => {
    setScrollerStyle({
      overflow: null,
      scrollbarWidth,
    });
  }, []);

  const updateScrollButtonState: any = useEventCallback(() => {
    if (scrollButtons !== false) {
      const { scrollTop, scrollHeight, clientHeight, scrollWidth, clientWidth } = tabsRef.current;
      let showStartScroll;
      let showEndScroll;

      if (vertical) {
        showStartScroll = scrollTop > 1;
        showEndScroll = scrollTop < scrollHeight - clientHeight - 1;
      } else {
        const scrollLeft = getNormalizedScrollLeft(tabsRef.current, theme.direction);
        // use 1 for the potential rounding error with browser zooms.
        showStartScroll = isRtl ? scrollLeft < scrollWidth - clientWidth - 1 : scrollLeft > 1;
        showEndScroll = !isRtl ? scrollLeft < scrollWidth - clientWidth - 1 : scrollLeft > 1;
      }

      if (showStartScroll !== displayScroll.start || showEndScroll !== displayScroll.end) {
        setDisplayScroll({ start: showStartScroll, end: showEndScroll });
      }
    }
  });

  const handleTabsScroll = React.useMemo(
    () =>
      debounce(() => {
        updateScrollButtonState();
      }, 166),
    [updateScrollButtonState],
  );

  React.useEffect(() => {
    return () => {
      handleTabsScroll.cancel();
    };
  }, [handleTabsScroll]);

  React.useEffect(() => {
    updateScrollButtonState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scroll = (scrollValue) => {
    animate(scrollStart, tabsRef.current, scrollValue);
  };

  const moveTabsScroll = (delta) => {
    let scrollValue = tabsRef.current[scrollStart];

    if (vertical) {
      scrollValue += delta;
    } else {
      scrollValue += delta * (isRtl ? -1 : 1);
      // Fix for Edge
      scrollValue *= isRtl && detectScrollType() === 'reverse' ? -1 : 1;
    }

    scroll(scrollValue);
  };

  const getScrollSize = () => {
    const containerSize = tabsRef.current[clientSize];
    let totalSize = 0;
    const children = Array.from(tabListRef.current.children);

    for (let i = 0; i < children.length; i += 1) {
      const tab = children[i];
      if (totalSize + tab[clientSize] > containerSize) {
        break;
      }
      totalSize += tab[clientSize];
    }
    return totalSize;
  };

  const handleStartScrollClick = () => {
    moveTabsScroll(-1 * getScrollSize());
  };

  const handleEndScrollClick = () => {
    moveTabsScroll(getScrollSize());
  };

  const scrollButtonsActive = displayScroll.start || displayScroll.end;
  const showScrollButtons = (scrollButtons === 'auto' && scrollButtonsActive) || scrollButtons === true;

  const conditionalElements: {
    scrollbarSizeListener?: React.ReactNode,
    scrollButtonStart?: React.ReactNode,
    scrollButtonEnd?: React.ReactNode,
  } = {};

  conditionalElements.scrollbarSizeListener = (
    <ScrollbarSize
      onChange={handleScrollbarSizeChange}
      className={classnames(classes.scrollableX, classes.hideScrollbar)}
    />
  );

  conditionalElements.scrollButtonStart = showScrollButtons ? (
    <Zoom in={displayScroll.start}>
      <ScrollbarButton
        orientation={orientation}
        direction={isRtl ? 'right' : 'left'}
        onClick={handleStartScrollClick}
        // disabled={!displayScroll.start}
        className={classnames(classes.scrollButtons, {
          [classes.scrollButtonsHideMobile]: !allowScrollButtonsMobile,
        })}
        // {...TabScrollButtonProps}
      />
    </Zoom>
  ): null;

  conditionalElements.scrollButtonEnd = showScrollButtons ? (
    <Zoom in={displayScroll.end}>
      <ScrollbarButton
        orientation={orientation}
        direction={isRtl ? 'left' : 'right'}
        onClick={handleEndScrollClick}
        // disabled={!displayScroll.end}
        className={classnames(classes.scrollButtons, {
          [classes.scrollButtonsHideMobile]: !allowScrollButtonsMobile,
        })}
        // {...TabScrollButtonProps}
      />
    </Zoom>
  ): null;

  return <Component
    className={classnames(
      classes.root,
      {
        [classes.vertical]: vertical,
      },
      className,
    )}
    ref={ref}
    {...other}
  >
    {conditionalElements.scrollbarSizeListener}
    <div
      className={classnames(classes.scroller, {
        [classes.hideScrollbar]: !visibleScrollbar,
        [classes.scrollableX]: !vertical,
        [classes.scrollableY]: vertical,
      })}
      style={{
        overflow: scrollerStyle.overflow,
        [vertical ? `margin${isRtl ? 'Left' : 'Right'}` : 'marginBottom']: visibleScrollbar
          ? undefined
          : -scrollerStyle.scrollbarWidth,
      }}
      ref={tabsRef}
      onScroll={handleTabsScroll}
      id={id}
    >
      {/* The tablist isn't interactive but the tabs are */}
      {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus */}
      <div
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-orientation={orientation === 'vertical' ? 'vertical' : null}
        className={classnames(classes.flexContainer, {
          [classes.flexContainerVertical]: vertical,
          // [classes.centered]: centered && !scrollable,
        })}
        // onKeyDown={handleKeyDown}
        ref={tabListRef}
        role="tablist"
      >
        {children}
      </div>
    </div>
    {conditionalElements.scrollButtonStart}
    {conditionalElements.scrollButtonEnd}
  </Component>;
});

if (process.env.NODE_ENV !== 'production') {
  Scrollbar.displayName = 'penguin_ui_scrollbar__Scrollbar';
}

export default withStyles(styles, { name: 'Scrollbar' })(Scrollbar);
