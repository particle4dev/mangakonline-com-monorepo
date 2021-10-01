import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
// import Tabs from '@material-ui/core/Tabs'
// import Tab from '@material-ui/core/Tab'
import { Tabs, Tab } from '@mp-workspace/ui-penguin-ui-material-ui-extension';

const debug = require('debug')('components:MangaIdPageContent:MangaPageTabs');

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
  style?: React.CSSProperties;
}

export function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `profile-tab-${index}`,
    'aria-controls': `profile-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    borderBottom: `1px solid ${
      theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.12)'
    }`,
  },
}));

type MangaPageTabsProps = {
  defaultValue: number,
  onChange?: (event: React.ChangeEvent<{}>, newValue: number) => void
}

const MangaPageTabs = ({ defaultValue, onChange }: MangaPageTabsProps) => {
  debug('render');

  const classes = useStyles();
  const [value, setValue] = React.useState(defaultValue);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    event.preventDefault();
    setValue(newValue);
    if(onChange) {
      onChange(event, newValue);
    }
  };

  return (
    <Tabs value={value} className={classes.root} onChange={handleChange} aria-label="profile tabs">
      <Tab label="Chapters" {...a11yProps(0)} />
      <Tab label="About" {...a11yProps(1)} />
    </Tabs>
  );
};

if (process.env.NODE_ENV !== 'production') {
  MangaPageTabs.displayName = 'containers__MangaIdPageContent_MangaPageTabs';
}

MangaPageTabs.defaultProps = {};

export default MangaPageTabs;
