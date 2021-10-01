import * as React from 'react';
import classnames from 'classnames';
import { makeStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import TwitterIcon from '@material-ui/icons/Twitter';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('@penguin-ui/react-social-sharing:TwitterButton');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createTwitterLink(context: any) {
  let str = "";
  for (const key in context) {
    if (str !== "") {
      str += "&";
    }
    str += key + "=" + encodeURIComponent(context[key]);
  }
  return `https://twitter.com/intent/tweet?${str}`;
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

type ITwitterButtonProps = {
  url?: string | null,
  text?: string,
  via?: string,
  related?: string[],
  className?: string
}

const TwitterButton = React.forwardRef(function TwitterButton(props: ITwitterButtonProps, ref: React.Ref<HTMLDivElement>) {
  debug('render');

  const {url, text, via, className} = props;
  const disabled = !url;
  const classes = useStyles({});
  const cls = classnames(classes.root, className);

  const onClick = () => {
    window.open(createTwitterLink({
      url,
      text,
      via
    }), "_blank");
  };

  return (
    <div ref={ref} className={cls}>
      <IconButton disabled={disabled} onClick={onClick} aria-label="shate on twitter">
        <TwitterIcon className={classes.root__icon} width={40} height={40} />
      </IconButton>
      <Typography className={classes.root__title}>Twitter</Typography>
    </div>
  );
});

if (process.env.NODE_ENV !== 'production') {
  TwitterButton.displayName = 'penguin_react_social_sharing__TwitterButton';
}

TwitterButton.defaultProps = {};

export default TwitterButton;

// https://twitter.com/intent/tweet?url=https%3A//youtu.be/i74UXEch9-s&text=CHUY%E1%BB%86N%20HI%E1%BA%BEM%20%E1%BB%9E%20M%E1%BB%B8%3A%20XE%20T%C3%94NG%20TH%E1%BA%B2NG%20V%C3%80O%20KHU%20NH%C3%80%20GI%C3%80U%20V%C3%80%20C%C3%81I%20K%E1%BA%BET%20%C4%90%E1%BA%AENG%20-%20HELLO...&via=YouTube&related=YouTube,YouTubeTrends,YTCreators
