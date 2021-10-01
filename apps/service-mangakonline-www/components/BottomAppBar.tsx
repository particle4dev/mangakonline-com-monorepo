import * as React from 'react';
import { useRouter } from 'next/router';
import isNumber from 'lodash/isNumber';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import HomeIcon from '@material-ui/icons/Home';
import ExploreIcon from '@material-ui/icons/Explore';
import StoreIcon from '@material-ui/icons/Store';
import { ROUTER, ALL_ROUTER } from '../constants';
import goTo from './goTo';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('components:BottomAppBar');

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      top: 'auto',
      bottom: 0,
      backgroundColor: theme.palette.background.default,
    },
    indicator: {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      '& > div': {
        maxWidth: 40,
        width: '100%',
        backgroundColor: '#635ee7',
      },
    },
  }), {
  name: 'BottomAppBar'
}
);

function a11yProps(index: number) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

function getMenuTabValueByURL(route) {
  const r = ALL_ROUTER.find(r => route.indexOf(ROUTER[r].path) !== -1);
  return ROUTER[r].path;
}

type BottomAppBarProps = {
  defaultValue?: string
}

function BottomAppBar({ defaultValue = null }: BottomAppBarProps) {
  debug('render');

  const classes = useStyles();
  const router = useRouter();
  const [value, setValue] = React.useState(getMenuTabValueByURL(defaultValue || router.asPath));

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    // event.preventDefault();

    if(!isNumber(newValue)) {
      setValue(newValue);
      setTimeout(() => {
        goTo(newValue);
      }, 300);
    }
  };

  return (
    <AppBar position="fixed" color="default" className={classes.appBar}>
      <Tabs
        value={value}
        onChange={handleChange}
        classes={{
          indicator: classes.indicator
        }}
        variant="fullWidth"
        // scrollButtons="off"
        centered
        // indicatorColor="primary"
        textColor="primary"
        // aria-label="scrollable force tabs example"
      >
        <Tab
          label={ROUTER.HOME.label}
          value={ROUTER.HOME.path}
          icon={<HomeIcon />}
          data-ga-event-category="BottomAppBar"
          data-ga-event-action="click"
          data-ga-event-label={ROUTER.HOME.label}
          {...a11yProps(0)}
        />
        <Tab
          label={ROUTER.BROWSE.label}
          value={ROUTER.BROWSE.path}
          icon={<ExploreIcon />}
          data-ga-event-category="BottomAppBar"
          data-ga-event-action="click"
          data-ga-event-label={ROUTER.BROWSE.label}
          {...a11yProps(1)}
        />
        <Tab
          disabled
          label="Shop"
          icon={<StoreIcon />}
          data-ga-event-category="BottomAppBar"
          data-ga-event-action="click"
          data-ga-event-label="Shop"
          {...a11yProps(2)}
        />
      </Tabs>
    </AppBar>
  );
}

if (process.env.NODE_ENV !== 'production') {
  BottomAppBar.displayName = 'components__BottomAppBar';
}

BottomAppBar.defaultProps = {};

export default React.memo(BottomAppBar);
