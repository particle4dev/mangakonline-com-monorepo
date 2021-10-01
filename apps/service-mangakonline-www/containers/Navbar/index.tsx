import * as React from "react";
// import gql from 'graphql-tag';
// import { get } from 'dot-prop';
// import { useQuery, NetworkStatus } from '@apollo/client';
import Link from 'next/link';
import { WithStyles, createStyles, withStyles, Theme } from '@material-ui/core';
// import Avatar from '@material-ui/core/Avatar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { AppBar, ToolbarSection } from '@mp-workspace/ui-penguin-ui-material-ui-extension';
import Drawer from '../../components/Drawer';
import { ReactComponent as MgLogo } from '../../public/mangakonline-com.svg';
// import HideOnScrolling from './HideOnScrolling';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('containers:Navbar');

// const NAVBAR_QUERY = gql`
//   query NAVBAR_QUERY {
//     me {
//       _id
//     }
//   }
// `;

const styles = (theme: Theme) => createStyles({
  root: {
    boxShadow: 'none',
    backgroundColor: theme.palette.background.default,
    // left: 72
  },
  // root__onlySmallScreen: {
  //   [theme.breakpoints.up('md')]: {
  //     display: 'none',
  //   },
  // },

  // root_onlyBigScreen: {
  //   [theme.breakpoints.down('sm')]: {
  //     display: 'none',
  //   },
  // },

  avatar: {
    margin: '8px 0px 8px 12px',
    width: 32,
    height: 32
  }
});

type INavbarProps = WithStyles<typeof styles> & {
  title?: React.ReactNode,
  children?: React.ReactNode,
  style?: React.CSSProperties,
}

function Navbar({ children, classes, title, style }: INavbarProps) {
  debug('render');

  // const { loading, error, data, fetchMore, networkStatus } = useQuery(
  //   NAVBAR_QUERY,
  //   {
  //     variables: {},
  //     // Setting this value to true will make the component rerender when
  //     // the "networkStatus" changes, so we are able to know if it is fetching
  //     // more data
  //     notifyOnNetworkStatusChange: true,
  //   }
  // );

  // const loadingMorePosts = networkStatus === NetworkStatus.fetchMore;

  // console.log(loadingMorePosts, data, error, loading);

  const [drawerStatus, setDrawerStatus] = React.useState(false);

  const toggleDrawer = () => {
    setDrawerStatus(!drawerStatus);
  };

  // const openLoginDialog = evt => {
  //   if (evt) evt.preventDefault()
  // }

  return (
    <>
      <Drawer open={drawerStatus} toggleDrawer={toggleDrawer} />
      <AppBar className={classes.root} style={style} elevation={0}>
        <Toolbar>
          <ToolbarSection
            start
            style={{
              flex: 1,
            }}
          >
            <div
              // className={classes.root__onlySmallScreen}
              style={{
                margin: '8px 0',
              }}
            >
              <IconButton
                color="inherit"
                aria-label="Menu"
                onClick={toggleDrawer}
              >
                <MenuIcon />
              </IconButton>
            </div>
            {/* <div className={classes.root_onlyBigScreen}>
              <Logo />
            </div> */}
            {title}
            {/* <div className={classes.root_onlyBigScreen}>
              <HeaderTabs />
            </div> */}
          </ToolbarSection>
          <ToolbarSection style={{
            textAlign: 'center',
            justifyContent: 'center'
          }}>
            <Link href="/">
              <MgLogo width="84" height="48" />
            </Link>
          </ToolbarSection>
          <ToolbarSection end>
            <Link href="/search">
              <IconButton aria-label="search">
                <SearchIcon fontSize="inherit" />
              </IconButton>
            </Link>
            {/* {get(data, 'me', null) && <Avatar alt="Remy Sharp" className={classes.avatar} src="https://material-ui.com/static/images/avatar/1.jpg" />} */}
          </ToolbarSection>
        </Toolbar>
        {children}
      </AppBar>
    </>
  );
}

if (process.env.NODE_ENV !== 'production') {
  Navbar.displayName = 'containers__Navbar';
}

Navbar.defaultProps = {
  title: null
};

export default React.memo(withStyles(styles, {name: 'Navbar'})(Navbar));
