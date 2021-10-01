import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import SectionClients from '../SectionClients';

const debug = require('debug')('components:Section');

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    // paddingTop: theme.spacing(0),
    // paddingBottom: theme.spacing(0),

    // maxWidth: 1024,
    clear: 'both',
    // clear: 'left',
    marginTop: -54,
    paddingTop: 86,

    '&::before': {
      borderTop: `1px solid ${theme.palette.divider}`,
      content: '""',
      display: 'block',
      marginBottom: '32px',
      overflow: 'hidden'
    }
  }
}));

type ISectionProps = {
    children: React.ReactNode,
    id?: string,
    name?: string
}

function Section(props: ISectionProps) {
  debug('render');
  const classes = useStyles({});

  return (
    <SectionClients data-id={props.id} data-name={props.name} className={classes.root} disablePadding>
      {props.children}
    </SectionClients>
  );
}

if (process.env.NODE_ENV !== 'production') {
  Section.displayName = 'components__Section';
}

Section.defaultProps = {};

export default React.memo(Section);
