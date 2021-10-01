import * as React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Button, { ButtonProps } from '@material-ui/core/Button';
import ShareIcon from '@material-ui/icons/Share';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import copy from 'clipboard-copy';
import DialogTitle from './DialogTitle';
import FacebookButton from './FacebookButton';
import TwitterButton from './TwitterButton';

const useStyles = makeStyles((theme: Theme) => {
  const backgroundColorDefault =
    theme.palette.type === 'light' ? theme.palette.grey[100] : theme.palette.grey[900];

  return {
    root__button: {
      marginRight: 16
    },

    root__content: {
      minHeight: 269,
      // width: 470,
    },

    root__shareTargets: {
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      flexDirection: 'row',
      display: 'flex',
      flexWrap: 'wrap',
      boxSizing: 'border-box'
    },

    root__copyLink: {
      marginTop: 24
    },

    root__copyLinkRenderer: {
      justifyContent: "space-between",
      backgroundColor: backgroundColorDefault,
      borderRadius: 2,
      display: 'flex',
      alignItems: 'center'
    },

    root__copyLinkInput: {
      marginLeft: theme.spacing(2),
      border: 'none',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      backgroundColor: 'rgba(0, 0, 0, 0)',
      color: theme.palette.getContrastText(backgroundColorDefault),
      fontSize: 14,
      // flex: 1
    },
  };
});

const nameid = 'react-social-sharing';

type IShareButtonProps = ButtonProps & {
  text?: string,
  account?: string
}

const ShareButton = React.forwardRef(function ShareButton(props: IShareButtonProps, ref: React.Ref<HTMLDivElement>) {
  const {text, account, ...other} = props;

  const classes = useStyles({});

  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [open, setOpen] = React.useState<boolean>(false);

  const [url, setUrl] = React.useState<string>('');

  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onClickCopyButton = async () => {
    await copy(url);
    if(inputRef && inputRef.current) {
      // inputRef.current.focus()
      inputRef.current.select();
    }
  };

  React.useEffect(() => {
    setUrl(window.location.href);
  }, []);

  return (
    <div ref={ref}>
      <Button
        color="primary"
        startIcon={<ShareIcon fontSize="small" />}
        {...other}
        onClick={handleClickOpen}
      >
        Share
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby={`${nameid}-title`}
        aria-describedby={`${nameid}-description`}
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle id={`${nameid}-title`} onClose={handleClose}>Share</DialogTitle>
        <DialogContent id={`${nameid}-description`} className={classes.root__content}>
          <div className={classes.root__shareTargets}>
            <TwitterButton
              className={classes.root__button}
              url={url}
              text={text}
              via={account}
            />
            <FacebookButton
              className={classes.root__button}
              url={url}
            />
          </div>
          <div className={classes.root__copyLink}>
            <div className={classes.root__copyLinkRenderer}>
              <input ref={inputRef} className={classes.root__copyLinkInput} readOnly size={45} value={url} />
              <Button onClick={onClickCopyButton}>Copy</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
});

if (process.env.NODE_ENV !== 'production') {
  ShareButton.displayName = 'penguin_react_social_sharing__ShareButton';
}

ShareButton.defaultProps = {};

export default ShareButton;
