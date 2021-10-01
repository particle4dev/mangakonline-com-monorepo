import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const debug = require('debug')('components:Divider');

const useStyles = makeStyles((theme) => ({
  root__divider: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  }
}));

function Divider() {
  debug(`render`);
  const classes = useStyles({});

  return (
    <h2 className={classes.root__divider}> — </h2>
  );
}

Divider.defaultProps = {};

Divider.displayName = 'Divider';

export default Divider;
