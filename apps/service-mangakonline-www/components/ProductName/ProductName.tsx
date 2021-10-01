import * as React from 'react';
import ClassNames from 'classnames';
import { WithStyles, createStyles, withStyles } from '@material-ui/core';
import { ROUTER } from '../../constants';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('components:ProductName');

const styles = () => createStyles({
  root: {
    display: 'flex',
    flex: '0 0 auto',
    height: '24px',
    margin: '20px 0'
  },

  productName: {
    display: 'inline-block',
    font: '24px/24px Roboto, sans-serif',
    letterSpacing: 0,
    verticalAlign: 'top',
    whiteSpace: 'nowrap'
  },

  gutterLeft: {
    margin: '0 16px'
  }
});

type ProductNameProps = WithStyles<typeof styles> & {
  gutterLeft?: boolean,
  title?: string
}

const ProductName = React.forwardRef(function ProductName(props: ProductNameProps, ref: React.Ref<HTMLDivElement>) {
  debug('render');

  const { gutterLeft, classes, title, ...other } = props;
  const clsProductName = ClassNames(classes.productName, {
    [classes.gutterLeft]: gutterLeft
  });

  return (
    <div ref={ref} className={classes.root} {...other}>
      <a
        href={ROUTER.HOME.path}
        data-label="Site Name"
      >
        <span className={clsProductName}>{title}</span>
      </a>
    </div>
  );
});

if (process.env.NODE_ENV !== 'production') {
  ProductName.displayName = 'components__ProductName';
}

ProductName.defaultProps = {
  gutterLeft: false,
  title: process.env.NEXT_PUBLIC_SITE_NAME
};

export default React.memo(withStyles(styles, {name: 'ProductName'})(ProductName));
