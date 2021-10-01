// https://store.google.com/us/account?hl=en-US
import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import SectionClients from '../../components/SectionClients';
import { Content } from '@mp-workspace/ui-penguin-ui-material-ui-extension';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
// import Head from 'components/head'
// import Footer from 'components/Footer'
// import Navbar from 'containers/Navbar'
import PageTitle from '../../components/TitleSection';
import SwitchListSecondary from '../../containers/settings/SwitchListSecondary';

const debug = require('debug')('www:pages:SettingsPage');

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'relative',
  },

  root__sectionTitle: {
    marginBottom: theme.spacing(2),

    [theme.breakpoints.up('md')]: {
      marginBottom: 0
    }
  },

  root__sectionContent: {
    marginBottom: theme.spacing(2),
  },

  root__cardMedia: {
    backgroundSize: '100% 100%',
    height: 152,
    width: '100%'
  },

  avatar: {
    backgroundColor: red[500],
  },
}));

const SettingsPage = () => {
  debug('render');

  const classes = useStyles({});

  return (
    <>
      {/* <Head title={`Settings | ${process.env.SITE_NAME}`} />
            <Navbar /> */}
      <Content top={64}>
        <SectionClients className={classes.root}>
          <PageTitle title="Settings" />

          <Grid container justify="center" spacing={0}>
            <Grid item md={4} xs={12}>
              <Typography variant="h5" className={classes.root__sectionTitle}>
                                Account
              </Typography>
            </Grid>
            <Grid item md={8} xs={12}>
              <Card className={classes.root__sectionContent}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                                            R
                    </Avatar>
                  }
                  title="Nam Hoang"
                  subheader="namehoang02@gmail.com"
                />
              </Card>
            </Grid>
            <Grid item md={4} xs={12}>
              <Typography variant="h5" className={classes.root__sectionTitle}>
                                Email
              </Typography>
            </Grid>
            <Grid item md={8} xs={12}>
              <Card className={classes.root__sectionContent}>
                <CardMedia
                  className={classes.root__cardMedia}
                  image="/static/settings/cbimage.png"
                  title="Email Preferences"
                />
                <CardContent>
                  <SwitchListSecondary />
                </CardContent>
              </Card>
            </Grid>
            <Grid item md={4} xs={12}>
              <Typography variant="h5" className={classes.root__sectionTitle}>
                                Phone number
              </Typography>
            </Grid>
            <Grid item md={8} xs={12}>
              <Card>
                <CardContent>
                                    12
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </SectionClients>
      </Content>
      {/* <Footer /> */}
    </>
  );
};

SettingsPage.displayName = 'SettingsPage';

SettingsPage.defaultProps = {};

export default SettingsPage;
