import * as React from 'react';
import Button, { ButtonProps } from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const debug = require('debug')('components:LoadingButton');

interface ILoadingButtonProps extends ButtonProps {
  loading?: boolean;
}

function LoadingButton(props: ILoadingButtonProps) {
  debug('render');

  // @ts-ignore
  const { className, children, loading, ...other } = props;

  return (
    <Button
      className={className}
      variant="contained"
      startIcon={loading ? <CircularProgress color="secondary" size={24} /> : null}
      disableElevation
      disabled={loading}
      {...other}
    >
      {children}
    </Button>
  );
}

if (process.env.NODE_ENV !== 'production') {
  LoadingButton.displayName = 'components__LoadingButton';
}

LoadingButton.defaultProps = {
  loading: false
};

export default LoadingButton;
