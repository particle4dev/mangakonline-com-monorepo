import * as React from 'react';
import classnames from 'classnames';
import { makeStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FacebookIcon from '@material-ui/icons/Facebook';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('@penguin-ui/react-social-sharing:FacebookButton');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createFacebookLink(context: any) {
  let str = "";
  for (const key in context) {
    if (str !== "") {
      str += "&";
    }
    str += key + "=" + encodeURIComponent(context[key]);
  }
  return `https://facebook.com/sharer/sharer.php?${str}`;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: 'fit-content',
    display: 'flex',
    flexDirection: 'column',
  },
  root__title: {
    width: 64,
    textAlign: 'center'
  },
  root__icon: {
    width: 40,
    height: 40
  }
}));

type IFacebookButtonProps = {
  url?: string | null,
  className?: string
}

const FacebookButton = React.forwardRef(function FacebookButton(props: IFacebookButtonProps, ref: React.Ref<HTMLDivElement>) {
  debug('render');

  const {url, className} = props;
  const disabled = !url;
  const classes = useStyles({});
  const cls = classnames(classes.root, className);

  const onClick = () => {
    window.open(createFacebookLink({
      u: url
    }), "_blank");
  };

  return (
    <div ref={ref} className={cls}>
      <IconButton disabled={disabled} onClick={onClick} aria-label="shate on facebook">
        <FacebookIcon className={classes.root__icon} width={40} height={40} />
      </IconButton>
      <Typography className={classes.root__title}>Facebook</Typography>
    </div>
  );
});

if (process.env.NODE_ENV !== 'production') {
  FacebookButton.displayName = 'penguin_react_social_sharing__FacebookButton';
}

FacebookButton.defaultProps = {};

export default FacebookButton;
