import * as React from 'react';
import classnames from 'classnames';
import { makeStyles, Theme } from '@material-ui/core/styles';
import MuiDialogTitle, {DialogTitleProps as MuiDialogTitleProps} from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('@penguin-ui/react-social-sharing:DialogTitle');

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: 0,
  },

  root__closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

type IDialogTitleProps =  MuiDialogTitleProps & {
  id: string;
  onClose: () => void;
}

const DialogTitle = React.forwardRef(function DialogTitle(props: IDialogTitleProps, ref: React.Ref<HTMLElement>) {
  debug('render');

  const classes = useStyles({});

  const { children, className, onClose, ...other } = props;
  const classesButton = classnames(classes.root, className);

  return (
    <MuiDialogTitle ref={ref} disableTypography className={classesButton} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.root__closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

if (process.env.NODE_ENV !== 'production') {
  DialogTitle.displayName = 'penguin_react_social_sharing__DialogTitle';
}

DialogTitle.defaultProps = {};

export default DialogTitle;
