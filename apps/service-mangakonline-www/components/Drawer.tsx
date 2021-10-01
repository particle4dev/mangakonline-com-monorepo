import * as React from 'react';
import toUpper from 'lodash/toUpper';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
// import PersonalVideoIcon from '@material-ui/icons/PersonalVideo'
import WallpaperIcon from '@material-ui/icons/Public';
// import SearchIcon from '@material-ui/icons/Search'
import FindInPageIcon from '@material-ui/icons/FindInPage';
// import AssignmentIcon from '@material-ui/icons/Assignment'
// import RssFeedIcon from '@material-ui/icons/RssFeed'
import goTo from './goTo';
import { ROUTER } from '../constants';
import ProductName from './ProductName';
// import {version} from '../../package.json'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('components:Drawer');

const useStyles = makeStyles((theme) => ({
  root__header: {
    width: 280,
    maxWidth: 280,
    position: 'relative',
    padding: `0 ${theme.spacing(2)}px`,
    // padding: `${theme.spacing(2)}px ${theme.spacing(1)}px`,
    // color: theme.palette.primary.contrastText,
    // backgroundColor: theme.palette.primary.main,
    // paddingTop: '56.25%',
    display: 'block'
  },

  root__content: {
    flexGrow: 1,
    boxSizing: 'border-box',
    margin: 0,
    overflowX: 'hidden',
    overflowY: 'auto',
    touchAction: 'pan-y'
  },

  root__guideRenderer: {
    padding: 16,
    bottom: 0,
    boxSizing: 'border-box',
    position: 'absolute',
    lineHeight: '24px',
    width: '100%',

    '& ul': {
      listStyleType: 'none',
      margin: 0,
      padding: 0
    },

    '& li:not(:last-child)': {
      padding: '0 10px 0 0',
    },

    '& li': {
      display: 'inline-block'
    },

    '& a': {
      textDecoration: 'none',
      borderBottom: '1px solid transparent'
    }
  },

  root__divider: {
    boxShadow: 'inset 0px 4px 8px -3px rgba(17, 17, 17, .06)',
    height: 5,
    opacity: 1,
    pointerEvents: 'none',
    backgroundColor: 'transparent',
  },

}), { name: 'Drawer' });

function Drawer({ open, toggleDrawer }) {
  debug('render');

  const router = useRouter();
  const classes = useStyles({});
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const gotoToBrowsePage = evt => {
    // evt.preventDefault();

    toggleDrawer();
    setTimeout(() => {
      goTo(ROUTER.BROWSE.path);
    }, 300);
  };

  const gotoToSearchPage = evt => {
    // evt.preventDefault();

    toggleDrawer();
    setTimeout(() => {
      // goTo(ROUTER.SEARCH.path)
    }, 300);
  };

  const gotoToAboutPage = (event: React.SyntheticEvent) => {
    // event.preventDefault();

    toggleDrawer();
    setTimeout(() => {
      goTo(ROUTER.US.path);
    }, 300);
  };

  const renderHeader = () => (
    <>
      <Toolbar disableGutters className={classes.root__header}>
        <ProductName />
      </Toolbar>
      <Divider className={classes.root__divider} />
      {/* <header className={classes.root__header}>
        Version: {version}
      </header> */}
    </>
  );

  const renderContent = () => (
    <div className={classes.root__content}>
      {/* <List component="div" subheader={<ListSubheader component="div">SECTIONS</ListSubheader>}> */}
      <List subheader={<ListSubheader>SECTIONS</ListSubheader>}>
        <ListItem
          // button
          selected={router.route === ROUTER.BROWSE.path}
          onClick={gotoToBrowsePage}
          data-ga-event-category="Drawer"
          data-ga-event-action="click"
          data-ga-event-label={ROUTER.BROWSE.label}
        >
          <ListItemIcon><WallpaperIcon /></ListItemIcon>
          <ListItemText primary={ROUTER.BROWSE.label} />
        </ListItem>
        <ListItem
          // button
          selected={router.route === ROUTER.SEARCH.path}
          onClick={gotoToSearchPage}
          data-ga-event-category="Drawer"
          data-ga-event-action="click"
          data-ga-event-label={ROUTER.SEARCH.label}
        >
          <ListItemIcon><FindInPageIcon /></ListItemIcon>
          <ListItemText primary={ROUTER.SEARCH.label} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem
          // button
          selected={router.route === ROUTER.US.path}
          onClick={gotoToAboutPage}
          data-ga-event-category="Drawer"
          data-ga-event-action="click"
          data-ga-event-label={ROUTER.US.label}
        >
          <ListItemText primary={ROUTER.US.label} />
        </ListItem>
        {['Feedback', 'FAQ'].map((text: string) => (
          // <ListItem button key={text}>
          <ListItem key={`drawer-link-${text}`}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <SwipeableDrawer open={open} onOpen={toggleDrawer} onClose={toggleDrawer} disableBackdropTransition={!iOS} disableDiscovery={iOS}>
      {renderHeader()}
      {renderContent()}
      <Typography component="div" variant="body2" gutterBottom className={classes.root__guideRenderer}>
        © {new Date().getFullYear()} {toUpper(process.env.SITE_NAME)}
        <ul>
          <li>
            <a href="/privacy">
              Privacy
            </a>
          </li>
          <li>
            <a href="/agreement">
              Terms
            </a>
          </li>
        </ul>
      </Typography>
    </SwipeableDrawer>
  );
}

if (process.env.NODE_ENV !== 'production') {
  Drawer.displayName = 'components__Drawer';
}

Drawer.defaultProps = {};

export default React.memo(Drawer);
