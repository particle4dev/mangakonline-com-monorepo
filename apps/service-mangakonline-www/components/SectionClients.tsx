import * as React from 'react';
import ClassNames from 'classnames';
import { makeStyles, Theme } from '@material-ui/core/styles';

const debug = require('debug')('penguin-ui:FlatButton');

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingRight: '1.25rem',
    paddingLeft: '1.25rem',

    [theme.breakpoints.up('sm')]: {
      paddingRight: '3.125rem',
      paddingLeft: '3.125rem',
    },

    [theme.breakpoints.up('md')]: {
      paddingLeft: '5rem',
      paddingRight: '5rem',
    },

    [theme.breakpoints.up('lg')]: {
      paddingLeft: '7.5rem',
      paddingRight: '7.5rem',
    },
  },

  rootPadding: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
  },
}));

type ISectionClientsProps = {
    children: React.ReactNode;
    readonly className?: string;
    readonly disablePadding?: boolean;
}

function SectionClients(props: ISectionClientsProps) {
  debug('render');
  // @ts-ignore
  const { className, children, disablePadding, ...other } = props;
  const classes = useStyles({});
  const clas = ClassNames(
    classes.root,
    {
      [classes.rootPadding]: !disablePadding
    },
    className
  );

  return (
    <section className={clas} {...other}>
      {children}
    </section>
  );
}

SectionClients.defaultProps = {
  className: '',
  disablePadding: false
};

SectionClients.displayName = 'SectionClients';

export default SectionClients;
