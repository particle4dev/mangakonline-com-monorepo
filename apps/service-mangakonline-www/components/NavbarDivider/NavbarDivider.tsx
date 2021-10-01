import * as React from 'react';
import { WithStyles, createStyles, withStyles } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('components:NavbarDivider');

export const styles = () => createStyles({
  root: {
    bottom: -5,
    boxShadow: 'inset 0px 4px 8px -3px rgba(17, 17, 17, .06)',
    height: 5,
    left: 0,
    opacity: 1,
    pointerEvents: 'none',
    position: 'absolute',
    right: 0,
    backgroundColor: 'transparent'
  },
});

type NavbarDividerProps = WithStyles<typeof styles> & {}

const NavbarDivider = React.forwardRef(function NavbarDivider(props: NavbarDividerProps, ref: React.Ref<HTMLHRElement>) {
  debug('render');
  const { classes } = props;

  return <Divider ref={ref} className={classes.root} />;
});

if (process.env.NODE_ENV !== 'production') {
  NavbarDivider.displayName = 'components__NavbarDivider';
}

NavbarDivider.defaultProps = {};

export default withStyles(styles, { name: 'NavbarDivider' })(NavbarDivider);
