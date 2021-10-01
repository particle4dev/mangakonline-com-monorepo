import React from 'react';
import ClassNames from 'classnames';
import { WithStyles, createStyles, withStyles, Theme } from '@material-ui/core';

const debug = require('debug')('containers:ToolbarSection');

export const styles = () => createStyles({
  root: {
    display: 'inline-flex',
    flex: 1,
    alignItems: 'start',
    justifyContent: 'center',
    boxSizing: 'border-box',
    minWidth: 0,
    height: '100%',
  },

  root__alignStart: {
    justifyContent: 'flex-start',
    order: -1,
  },

  root__alignEnd: {
    justifyContent: 'flex-end',
    order: 1,
  }
});

type ToolbarSectionProps = WithStyles<typeof styles> & {
  start?: Boolean;
  end?: Boolean;
  className?: string;
  children?: JSX.Element|JSX.Element[];
  style?: React.CSSProperties;
}

function ToolbarSection({ classes, start, end, className, children, ...other }: ToolbarSectionProps) {
  debug('render');

  const cls = ClassNames(classes.root, {
    [classes.root__alignStart]: start,
    [classes.root__alignEnd]: end,
  }, className);

  return <section className={cls} {...other}>{children}</section>;
}

if (process.env.NODE_ENV !== 'production') {
  ToolbarSection.displayName = 'components__ToolbarSection';
}

ToolbarSection.defaultProps = {
  start: true,
  end: false
};

export default withStyles(styles, { name: 'ToolbarSection' })(ToolbarSection);
