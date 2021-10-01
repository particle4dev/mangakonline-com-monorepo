import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import FlatButton from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    marginBottom: 12
  },
  root__headerAction: {
    marginTop: 0,
    marginRight: 0
  }
});

export default function SimpleCard() {
  const classes = useStyles();

  return (
    <Card variant="outlined" className={classes.root}>
      <CardHeader
        action={
          <Typography variant="h5" component="h2" align="right" display="inline">
            $68.95
          </Typography>
        }
        classes={{
          action: classes.root__headerAction
        }}
        title="Subtotal"
      />
      <Divider />
      <CardContent>
        <FlatButton color="primary" variant="contained" disableElevation size="large" fullWidth style={{
          marginBottom: 12
        }}>
          Checkout
        </FlatButton>
        <Typography variant="caption" display="block">
          Tax for the full value and fees will be calculated at checkout.
        </Typography>
      </CardContent>
    </Card>
  );
}
