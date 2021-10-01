// https://store.google.com/us/cart?hl=en-US
import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import SectionClients from '../../components/SectionClients';
import { Content } from '@mp-workspace/ui-penguin-ui-material-ui-extension';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
// import Head from 'components/head'
// import Footer from 'components/Footer'
// import Navbar from 'containers/Navbar'

import SimpleCard from '../../containers/cart/SimpleCard';
import CartItems from '../../containers/cart/CartItems';
import FullbleedContainer from '../../containers/cart/FullbleedContainer';

const debug = require('debug')('pages:CartPage');

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'relative',
  },

  root__articles: {
    marginTop: theme.spacing(12),
    marginBottom: theme.spacing(12),
    textAlign: 'center',

    [theme.breakpoints.up('md')]: {
      fontSize: '3rem'
    }
  },
}));

const CartPage = () => {
  debug('render');

  const classes = useStyles({});

  return (
    <>
      {/* <Head title={`Cart | ${process.env.SITE_NAME}`} />
            <Navbar /> */}
      <Content top={64}>
        <SectionClients className={classes.root}>
          <Grid container justify="center" spacing={3}>
            <Grid item md={8} xs={12}>
              <CartItems />
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <SimpleCard />
              <Typography variant="caption" display="block">
                By selecting the button above, you agree to the Devices Terms of Sale.
              </Typography>
            </Grid>
          </Grid>
          <Grid container justify="center" spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h5" className={classes.root__articles}>
                You may also be into
              </Typography>
            </Grid>
            <FullbleedContainer />
          </Grid>
        </SectionClients>
      </Content>
      {/* <Footer /> */}
    </>
  );
};

CartPage.displayName = 'CartPage';

CartPage.defaultProps = {};

export default CartPage;
