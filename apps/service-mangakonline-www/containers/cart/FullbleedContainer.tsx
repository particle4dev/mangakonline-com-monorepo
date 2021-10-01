import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {
    marginBottom: 12
  },

  root__headerAction: {
    marginTop: 0,
    marginRight: 0
  },

  media: {
    height: 0,
    paddingTop: '100%'
  },
});

export default function FullbleedContainer() {
  const classes = useStyles();

  return (
    <>
      {[1, 2, 3, 4].map(key => (
        <Grid item md={3} sm={4} xs={12} key={`fullbleed-container-${key}`}>
          <Card variant="outlined" className={classes.root}>
            <CardMedia
              className={classes.media}
              image="https://cf.shopee.vn/file/b01444b4f3f664f513ac988e7c0b09b8"
              title="Towel"
            />
            <CardContent>
              <Typography variant="button" component="h2" align="right" style={{
                textAlign: 'center',
                marginBottom: 16
              }}>
                DÂY DẮT CHÓ TO TỪ 10-40KG
              </Typography>
              <Button color="primary" size="large" variant="contained" disableElevation style={{
                margin: '0 auto',
                display: 'block'
              }}>Buy</Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </>
  );
}
