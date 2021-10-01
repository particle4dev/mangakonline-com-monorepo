import * as React from "react";
import { useRouter } from 'next/router';
import { WithStyles, createStyles, withStyles, Theme } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AppBar from '@material-ui/core/AppBar';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('containers:BackNavbar');

const styles = (theme: Theme) => createStyles({
  root: {
    boxShadow: 'none',
    backgroundColor: theme.palette.background.default,
    // backgroundColor: 'transparent',
    // left: 72
  },

  avatar: {
    margin: '8px 0px 8px 12px',
    width: 32,
    height: 32
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },
});

type BackNavbarProps = WithStyles<typeof styles> & {
  title?: React.ReactNode,
  children?: React.ReactNode,
  style?: React.CSSProperties,
}

const BackNavbar = React.forwardRef(function BackNavbar({ children, classes, title, style }: BackNavbarProps, ref: React.Ref<HTMLElement>) {
  debug('render');

  const router = useRouter();

  const goBackPage = () => {
    router.back();
  };

  // const openLoginDialog = evt => {
  //   if (evt) evt.preventDefault()
  // }

  return (
    <AppBar ref={ref} position="fixed" color="default" className={classes.root} style={style} elevation={0}>
      <Toolbar>
        <IconButton
          className={classes.menuButton}
          color="inherit"
          aria-label="Menu"
          onClick={goBackPage}
        >
          <ArrowBackIcon />
        </IconButton>
        {title}
      </Toolbar>
      {children}
    </AppBar>);
});

if (process.env.NODE_ENV !== 'production') {
  BackNavbar.displayName = 'containers__BackNavbar';
}

BackNavbar.defaultProps = {
  title: null
};

export default React.memo(withStyles(styles, {name: 'BackNavbar'})(BackNavbar));
