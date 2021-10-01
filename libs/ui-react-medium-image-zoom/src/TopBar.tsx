import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import ToolbarSection from './ToolbarSection';

const debug = require('debug')('components:ImageZoom:TopBar');

type ITopBarProps = {
  handleClick: any
}

const TopBar = (props: ITopBarProps) => {
  debug('render');

  return (
    <AppBar elevation={0} style={{
      backgroundColor: 'transparent',
      color: 'white'
    }}>
      <Toolbar>
        <ToolbarSection
          start
          style={{
            flex: 2,
          }}
        >
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={props.handleClick}>
            <ArrowBackIcon />
          </IconButton>
        </ToolbarSection>
        <ToolbarSection end>
          <IconButton aria-label="search" color="inherit">
            <SearchIcon />
          </IconButton>
          <IconButton aria-label="display more actions" edge="end" color="inherit">
            <MoreIcon />
          </IconButton>
        </ToolbarSection>
      </Toolbar>
    </AppBar>
  );
};

if (process.env.NODE_ENV !== 'production') {
  TopBar.displayName = 'components__ImageZoom__TopBar';
}

TopBar.defaultProps = {};

export default TopBar;
