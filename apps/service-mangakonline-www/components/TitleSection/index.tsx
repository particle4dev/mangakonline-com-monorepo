import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const debug = require('debug')('components:TitleSection');

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    fontWeight: 400
  }
}));

type ITitleSectionProps = {
    title: string
}

function TitleSection(props: ITitleSectionProps) {
  debug('render');
  const classes = useStyles({});

  return (
    <Typography variant="h6" className={classes.root} gutterBottom>
      {props.title}
    </Typography>
  );
}

if (process.env.NODE_ENV !== 'production') {
  TitleSection.displayName = 'components__TitleSection';
}

TitleSection.defaultProps = {};

export default React.memo(TitleSection);
