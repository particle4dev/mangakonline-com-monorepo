import * as React from 'react';
import classnames from 'classnames';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('@penguin-ui/scrollbar:ScrollbarButton');

export const styles = (theme: Theme) => createStyles({
  /* Styles applied to the root element. */
  root: {
    position: 'absolute',
    // flexShrink: 0,
    opacity: 0.8,
    '&$disabled': {
      opacity: 0,
    },
  },

  /* Styles applied to the root element if `orientation="horizontal"`. */
  horizontal: {
    top: '50%',
    marginTop: -24,
  },

  /* Styles applied to the root element if `orientation="vertical"`. */
  vertical: {
    left: '50%',
    marginLeft: -24,
    '& svg': {
      transform: 'rotate(90deg)',
    },
  },

  /* Pseudo-class applied to the root element if `disabled={true}`. */
  disabled: {},

  /* Pseudo-class applied to the ButtonBase root element if the button is keyboard focused. */
  focusVisible: {},

  contained: {
    color: theme.palette.getContrastText(theme.palette.grey[300]),
    backgroundColor: theme.palette.grey[300],
    boxShadow: theme.shadows[2],
    '&:hover': {
      backgroundColor: theme.palette.grey.A100,
      boxShadow: theme.shadows[4],
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        boxShadow: theme.shadows[2],
        backgroundColor: theme.palette.grey[300],
      },
    },
    '&$focusVisible': {
      boxShadow: theme.shadows[6],
    },
    '&:active': {
      boxShadow: theme.shadows[8],
    },
    '&$disabled': {
      color: theme.palette.action.disabled,
      boxShadow: theme.shadows[0],
      backgroundColor: theme.palette.action.disabledBackground,
    },
  },

  buttonArrowLeft: {
    left: 0,
  },

  buttonArrowRight: {
    right: 0,
  },

  buttonArrowTop: {
    top: 0,
  },

  buttonArrowBottom: {
    bottom: 0,
  },
});

export type ScrollbarButtonProps = IconButtonProps & {
  className?: string,
  component?: React.ElementType,
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: {
    /** Styles applied to the root element. */
    root?: string;
    /** Styles applied to the root element if `orientation="vertical"`. */
    vertical?: string;

    horizontal?: string;
    /** Pseudo-class applied to the root element if `disabled={true}`. */
    disabled?: string;

    buttonArrowLeft?: string;
    buttonArrowRight?: string;
    buttonArrowTop?: string;
    buttonArrowBottom?: string;
    contained?: string;
  };
  /**
   * Which direction should the button indicate?
   */
  direction: 'left' | 'right';
  /**
   * If `true`, the element is disabled.
   */
  disabled?: boolean;
  /**
   * The tabs orientation (layout flow direction).
   */
  orientation: 'horizontal' | 'vertical';
}

const ScrollbarButton = React.forwardRef(function ScrollbarButton(props: ScrollbarButtonProps, ref: React.Ref<HTMLElement>) {
  debug('render');

  const { classes, className: classNameProp, direction, orientation, disabled, ...other } = props;

  return (
    <IconButton
      variant="contained"
      color="primary"
      component="div"
      className={classnames(
        classes.root,
        classes.contained,
        {
          [classes.vertical]: orientation === 'vertical',
          [classes.horizontal]: orientation === 'horizontal',
          [classes.disabled]: disabled,
          [classes.buttonArrowLeft]: orientation === 'horizontal' && direction === 'left',
          [classes.buttonArrowRight]: orientation === 'horizontal' && direction === 'right',
          [classes.buttonArrowTop]: orientation === 'vertical' && direction === 'left',
          [classes.buttonArrowBottom]: orientation === 'vertical' && direction === 'right',
        },
        classNameProp,
      )}
      ref={ref}
      role="button"
      tabIndex={null}
      {...other}
    >
      {direction === 'left' ? (
        <KeyboardArrowLeft />
      ) : (
        <KeyboardArrowRight />
      )}
    </IconButton>
  );
});

export default withStyles(styles, { name: 'ScrollbarButton' })(ScrollbarButton);
