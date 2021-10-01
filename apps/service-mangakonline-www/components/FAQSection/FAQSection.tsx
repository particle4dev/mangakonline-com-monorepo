import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import SectionClients from '../SectionClients';
import Divider from '../Divider';

const debug = require('debug')('penguin:containers:pricing:FAQSection');

const useStyles = makeStyles(theme => ({
  root__section: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
    // backgroundColor: '#f5f5f5'
  },

  root__header: {
    position: "relative",
    // margin: '25px 0 20px'
  },

  root__answer: {
    marginBottom: theme.spacing(3),
  }
}));

function FAQSection() {
  debug(`render`);

  const classes = useStyles();

  return (
    <SectionClients className={classes.root__section}>
      <Typography variant="h5" color='primary' gutterBottom>
        Frequently Asked Questions
      </Typography>
      <Divider />
      <Grid container direction="row" spacing={3}>
        <Grid item xs={12} sm={6} md={6}>
          <Typography variant="h6" gutterBottom className={classes.root__header}>
            Can I use this Template for learning purposes?
          </Typography>
          <Typography
            variant="body2"
            className={classes.root__answer}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Typography>

          <Typography variant="h6" gutterBottom className={classes.root__header}>
                        How can I deploy Penguin Landing Page?
          </Typography>
          <Typography
            variant="body2"
            className={classes.root__answer}
          >
                        Curabitur non laoreet odio. Aliquam a massa in ante tincidunt malesuada quis ut metus. Nam tristique bibendum elit, id commodo metus commodo non.
          </Typography>

          <Typography variant="h6" gutterBottom className={classes.root__header}>
                        Will you regularly give updates of Penguin Landing Page?
          </Typography>

          <Typography
            variant="body2"
          >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Typography variant="h6" gutterBottom className={classes.root__header}>
                        Do you Charge for each Upgrade?
          </Typography>
          <Typography
            variant="body2"
            className={classes.root__answer}
          >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Typography>
          <Typography variant="h6" gutterBottom className={classes.root__header}>
                        How can I get the customer support?
          </Typography>
          <Typography
            variant="body2"
          >
                        Curabitur non laoreet odio. Aliquam a massa in ante tincidunt malesuada quis ut metus. Nam tristique bibendum elit, id commodo metus commodo non.
          </Typography>
        </Grid>
      </Grid>
    </SectionClients>
  );
}

if (process.env.NODE_ENV !== 'production') {
  FAQSection.displayName = 'containers__FAQSection';
}

FAQSection.defaultProps = {};

export default FAQSection;
