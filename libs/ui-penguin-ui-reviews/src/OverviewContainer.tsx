// https://github.com/mui-org/material-ui/blob/d10f8369897f9faa98548c7e51d6637e0f75e267/packages/material-ui-lab/src/Rating/Rating.js
import * as React from 'react';
import { makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { isFragment } from 'react-is';
import {
  useForkRef,
  useIsFocusVisible,
} from '@material-ui/core/utils';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('@penguin-ui/reviews:OverviewContainer');

function round(num: number, decimal = 2) {
  return Math.round((num + Number.EPSILON) * Math.pow(10, decimal)) / Math.pow(10, decimal);
}

function clamp(value, min, max) {
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
}

function getDecimalPrecision(num) {
  const decimalPart = num.toString().split('.')[1];
  return decimalPart ? decimalPart.length : 0;
}

function roundValueToPrecision(value, precision) {
  if (value == null) {
    return value;
  }

  const nearest = Math.round(value / precision) * precision;
  return Number(nearest.toFixed(getDecimalPrecision(precision)));
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    // borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: 'transparent'
  },
}), {
  name: 'OverviewContainer'
});

export type OverviewContainerProps = {
  onMouseMove?: (event: React.MouseEvent) => void,
  onMouseLeave?: (event: React.MouseEvent) => void,
  onChangeActive?: (event: React.SyntheticEvent, value: number | null) => void,
  onChange?: (event: React.SyntheticEvent, value: number | null) => void,
  max?: number,
  precision?: number,
  id?: string,
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
}

// z6XoBf fade-in-animate
const OverviewContainer = React.forwardRef(function OverviewContainer(props: OverviewContainerProps, ref: React.Ref<HTMLElement>) {
  const {
    onMouseMove,
    onMouseLeave,
    onChangeActive,
    onChange,
    max = 5,
    precision = 1,

    id,
    children: childrenProp
  } = props;

  debug('render');
  const classes = useStyles({});

  const [{ hover, focus }, setState] = React.useState({
    hover: -1,
    focus: -1,
  });

  const [valueState, setValue] = React.useState(-1);

  const {isFocusVisible, onBlurVisible, ref: focusVisibleRef} = useIsFocusVisible();
  const [focusVisible, setFocusVisible] = React.useState(false);
  const theme = useTheme();

  const rootRef = React.useRef();
  const handleFocusRef = useForkRef(focusVisibleRef, rootRef);
  const handleRef: any = useForkRef(handleFocusRef, ref);

  const handleMouseMove = (event: React.MouseEvent) => {
    if (onMouseMove) {
      onMouseMove(event);
    }

    const rootNode: any = rootRef.current;
    if(!rootNode) return null;

    const { top, bottom } = rootNode.getBoundingClientRect();
    const { height } = rootNode.firstChild.getBoundingClientRect();
    let percent;

    if (theme.direction === 'rtl') {
      percent = (top - event.clientY) / (height * max);
    } else {
      percent = (bottom - event.clientY) / (height * max);
    }

    let newHover = roundValueToPrecision(max * percent + precision / 2, precision);
    newHover = clamp(newHover, precision, max);

    setState((prev) =>
      prev.hover === newHover && prev.focus === newHover
        ? prev
        : {
          hover: newHover,
          focus: newHover,
        },
    );

    setFocusVisible(false);

    if (onChangeActive && hover !== newHover) {
      onChangeActive(event, newHover);
    }
  };

  const handleMouseLeave = (event: React.MouseEvent) => {
    if (onMouseLeave) {
      onMouseLeave(event);
    }

    const newHover = -1;
    setState({
      hover: newHover,
      focus: newHover,
    });

    if (onChangeActive && hover !== newHover) {
      onChangeActive(event, newHover);
    }
  };

  // const handleChange = (event) => {

  // }

  const handleClear = (event) => {
    // Note: stops the event from bubbling up the event chain (click event)
    event.stopPropagation();
    console.log(event, event.clientX === 0 , event.clientY === 0, 'event');
    // Ignore keyboard events
    // https://github.com/facebook/react/issues/7407
    if (event.clientX === 0 && event.clientY === 0) {
      return;
    }

    setState({
      hover: -1,
      focus: -1,
    });

    setValue(-1);

    // if (onChange && parseFloat(event.target.value) === valueRounded) {
    //     onChange(event, null)
    // }
    if (onChange) {
      onChange(event, -1);
    }

    console.log(hover, focus);
  };

  // const handleFocus = (event) => {

  // }

  const handleFocus = (event, value) => {
    if (isFocusVisible(event)) {
      setFocusVisible(true);
    }

    // const newFocus = parseFloat(event.target.value)
    const newFocus = parseFloat(value);
    setState((prev) => ({
      hover: prev.hover,
      focus: newFocus,
    }));

    setValue(newFocus);

    if (onChangeActive && focus !== newFocus) {
      onChangeActive(event, newFocus);
    }
    if (onChange) {
      onChange(event, newFocus);
    }
  };

  // number of child components
  const childIndex = React.Children.count(childrenProp);
  // const childArray = React.Children.toArray(childrenProp);
  let total = 0;
  let score = 0;
  // for (let index = 0; index < childArray.length; index++) {
  //   const element: React.ReactNode = childArray[index];
  //   total += element.props.value;
  //   score += element.props.value * (childIndex - index);
  // }

  const children = React.Children.map(childrenProp, (child: React.ReactNode, i: number) => {
    if (!React.isValidElement(child)) {
      return null;
    }

    if (process.env.NODE_ENV !== 'production') {
      if (isFragment(child)) {
        console.error(
          [
            "The OverviewContainer component doesn't accept a Fragment as a child.",
            'Consider providing an array instead.',
          ].join('\n'),
        );
      }
    }

    total += child.props.value;
    score += child.props.value * (childIndex - i);

    // const childValue = child.props.value === undefined ? childIndex : child.props.value;

    // console.log(childValue, 'childValue')
    // score += child.props.value * childIndex;

    // childIndex -= 1;
    return React.cloneElement(child, {
      index: childIndex - i,
      reviews: child.props.value,
      total,
      handleFocus,
      handleClear,
      hover,
      focus,
      value: valueState
      // fullWidth: variant === 'fullWidth',
      // indicator: selected && !mounted && indicator,
      // selected,
      // selectionFollowsFocus,
      // onChange,
      // textColor,
      // value: childValue,
      // ...(childIndex === 1 && value === false && !child.props.tabIndex ? { tabIndex: 0 } : {}),
    });
    // const childValue = child.props.value === undefined ? childIndex : child.props.value;
    // valueToIndex.set(childValue, childIndex);
    // const selected = childValue === value;

    // childIndex += 1;
    // return React.cloneElement(child, {
    //   fullWidth: variant === 'fullWidth',
    //   indicator: selected && !mounted && indicator,
    //   selected,
    //   selectionFollowsFocus,
    //   onChange,
    //   textColor,
    //   value: childValue,
    //   ...(childIndex === 1 && value === false && !child.props.tabIndex ? { tabIndex: 0 } : {}),
    // });
  });

  // const handleBlur = (event) => {

  // }

  return (
    <Card id={id} elevation={0} className={classes.root}>
      <div className="QKs7ff jX0Cc" style={{
        paddingRight: '24px',
        // width: 70,

        // width: '100px',
        textAlign: 'center',
        marginLeft: 0,
        paddingLeft: 0,

        display: 'inline-block',
        // marginLeft: 'auto',
        marginRight: 'auto',
        // paddingLeft: '10px'
        verticalAlign: 'top',
        // width: '44%',
        // wordWrap: 'break-word',
        padding: '0px 24px 0px 0px'
      }}>
        <div className="itl29d" style={{
          display: 'inline-block',
          verticalAlign: 'middle'
        }}>
          <Typography color="primary" className="uYNZm" style={{
            fontSize: '48px',
            lineHeight: '48px',
            wordWrap: 'normal'
          }}>{round(score/total, 1)}</Typography>
          <div className="wQJ0B WVC2c" style={{
            lineHeight: '16px',

            height: '16px',
            padding: '2px 0 6px',
            marginLeft: '5px'
          }}>
            <Rating aria-label="5/5 sao" role="img" defaultValue={4.1} readOnly style={{
              fontSize: 14,
              width: 68
            }} />
          </div>
          <Typography className="shop__secondary qIEPib" style={{
            color:' #777',
            fontSize: '12px',
            lineHeight: '14px',
            maxWidth: '68px',
            margin: 'auto'
          }}>{total} reviews</Typography>
        </div>
      </div>
      <div
        className="bqCdTe"
        style={{
          display: 'inline-block',
          maxWidth: 'calc(100% - 102px)'
        }}
      >

        <div className="l1agtd" style={{

        }}>
          <div
            className="sh-rov__hist-container sh-rov__has-selected"
            ref={handleRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* <a className="aALHge LGgCZc internal-link" aria-disabled="false" data-url="/shopping/product/r/US/279967834285244755/reviews?psb=1&amp;prds=cid:279967834285244755,cs:1,rate:4,rnum:10,sgro:or" tabIndex={0} data-ved="0ahUKEwiPhJbuppDqAhWjUN4KHTaQBDIQn08IECgB">
                                <div className="rOdmxf" aria-hidden="true">4 sao</div>
                                <div className="wNgfq" aria-label="4 bài đánh giá 4 sao">
                                    <div className="VB1Zmd">
                                        <div className="efyqmf" style={{
                                            width: '36.3636360168457%'
                                        }}></div>
                                    </div>
                                </div>
                                <div className="alYoHe">
                                    <div className="vL3wxf" aria-hidden="true">4 bài đánh giá</div>
                                </div>
                            </a> */}

            {/* <div className="aALHge">
                                <div className="rOdmxf" aria-hidden="true">2 sao</div>
                                <div className="wNgfq" aria-label="0 bài đánh giá 2 sao">
                                    <div className="VB1Zmd">
                                        <div className="efyqmf" style={{
                                            width: '0%'
                                        }}></div>
                                    </div>
                                </div>
                            </div> */}
            {children}
          </div>
        </div>

      </div>
    </Card>
  );
});

if(process.env.NODE_ENV !== 'production') {
  OverviewContainer.displayName = 'penguin_ui_reviews__OverviewContainer';
}

OverviewContainer.defaultProps = {};

export default OverviewContainer;
