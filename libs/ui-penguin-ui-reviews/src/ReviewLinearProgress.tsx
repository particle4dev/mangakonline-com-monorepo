import * as React from "react";
import classnames from "classnames";
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('@penguin-ui/reviews:ReviewLinearProgress');

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'table-row',
    transition: 'opacity 300ms'
  },

  root__selected: {
    opacity: 1
  },

  root__label: {
    fontSize: '12px',
    whiteSpace: 'nowrap',
  },

  root__labelDisabled: {
    opacity: 0.4
  },

  root__item: {
    display: 'table-cell',
    lineHeight: '20px',
    verticalAlign: 'middle',
  },

  root__progress: {
    width: 342,
    paddingLeft: 10
  },

  root__hover: {
    opacity: 1,
    outline: 'none'
  },

  root_blurred: {
    opacity: 0.3
  },

  root__rightControl: {
    textAlign: 'right',
    whiteSpace: 'nowrap',
    display: 'none',

    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },

  root__rightText: {
    fontSize: '12px',
    lineHeight: '16px',

    display: 'inline',
    opacity: 0,
    paddingLeft: '10px'
  },

  root__rightTextSelected: {
    opacity: 1,
    outline: 'none'
  },

  root__linearprogress: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#f2f2f2',
  },

  root__linearprogressColorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    height: 8,
    // backgroundColor: '#ffb400'
  },

  root__linearprogressBar: {
    borderRadius: 4,
    backgroundColor: '#ffb400',
  },

  root__clearButtonImg: {
    backgroundColor: '#666',
    borderRadius: 5,
    height: '10px',
    lineHeight: '16px',
    margin: '0 0 1px 3px',
    outline: 'none',
    pointerEvents: 'visible',
    verticalAlign: 'middle',
    width: '10px',

    border: 'none'
  },

  root__clearButton: {
    position: 'absolute'
  },
}), {
  name: 'ReviewLinearProgress'
});

type IReviewLinearProgressProps = {
  reviews?: number,
  total?: number,
  label: string,
  handleClear?: (event: React.SyntheticEvent) => void,
  handleFocus?: (event: React.SyntheticEvent, value: number | null) => void,

  // state of element
  disabled?: boolean,

  //
  itemValue?: number,
  value: number,
  hover?: number,
  focus?: number,

  selected?: boolean,
  index?: number,
}

function ReviewLinearProgress(props: IReviewLinearProgressProps) {
  debug('render');

  const {
    handleClear,
    handleFocus,
    disabled: disabledProps = false,
    itemValue,

    value,
    total,
    reviews,
    label,
    hover,
    focus,
    index,

    selected = false
  } = props;

  // const isFocus = value !== -1;
  const disabled = disabledProps || reviews === 0;

  // const isSelected = value === itemValue;
  let isSelected = selected;
  if(hover === index) {
    isSelected = true;
  }

  if(focus === index) {
    isSelected = true;
  }

  if(focus === -1 && hover === -1 && value === -1) {
    isSelected = true;
  }

  if(value === index) {
    isSelected = true;
  }

  // const isHover = hover === itemValue;
  // let isBlurred = false;
  // if(isSelected) {
  //   isBlurred = false;
  // } else {
  //   if(isFocus) {
  //     // not hover (hover === -1)
  //     isBlurred = hover === -1 ? true : !isHover;
  //   } else {
  //     // not hover (hover === -1)
  //     isBlurred = hover === -1 ? false : !isHover;
  //   }
  // }

  const classes = useStyles({});

  const cls = classnames(classes.root, {
    [classes.root__selected]: isSelected
  });

  const onClick = (event: React.SyntheticEvent) => {
    // if(!isSelected && handleFocus) {
    handleFocus(event, index);
    // }
    // else {
    //   handleClear(event);
    // }
  };

  const children = [];

  children.push(<Typography key="review_linear_progress_label" color={isSelected ? 'primary' : 'inherit'} className={classnames(classes.root__label, classes.root__item, {
    [classes.root__labelDisabled]: !isSelected || disabled
  }, 'rOdmxf')} aria-hidden="true">{label}</Typography>);

  children.push(<div key="review_linear_progress_review" className={classnames(classes.root__item, classes.root__progress, {
    [classes.root_blurred]: !isSelected || disabled
  })} aria-label={`${reviews} bài đánh giá ${label}`}>
    <LinearProgress variant="determinate" value={reviews/total * 100} classes={{
      root: classes.root__linearprogress,
      colorPrimary: classes.root__linearprogressColorPrimary,
      bar: classes.root__linearprogressBar
    }} />
  </div>);

  if(!disabled) {
    children.push(
      <div key="review_linear_progress_right_control" className={classnames(classes.root__rightControl, 'alYoHe')}>
        <Typography className={classnames(classes.root__rightText, {
          [classes.root__rightTextSelected]: isSelected
        })} aria-hidden="true">{reviews} reviews</Typography>
        {value === index && (<span
          onClick={handleClear}
          className={classes.root__clearButton}
          data-url="/shopping/product/r/US/279967834285244755/reviews?psb=1&amp;prds=cid:279967834285244755,cs:1,sgro:or"
          aria-label={`${reviews} reviews ${label}`}
          role="button"
          tabIndex={0}
          data-ved="0ahUKEwiPhJbuppDqAhWjUN4KHTaQBDIQvM8DCA8">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwAgMAAAAqbBEUAAAADFBMVEVHcEz///////////8Gn9AKAAAABHRSTlMApFn+XJ6qIAAAAG5JREFUeAFiGBQgAURwQtiMP0CkvgOYw/4PRO6/AOZw/29gYGD6/wBQDB1gAADCABS9/40D2Xw+/gkWVNlb27iw80LEW/I5cuBBJAFBRBIQRAQRQUSSXBKWBEndT1uOhbaFNte2OxBH1SF2vPdrAJlqSY8uBFL2AAAAAElFTkSuQmCC"
            className={classes.root__clearButtonImg}
            alt="clear"
            data-atf="1"
          />
        </span>)}
      </div>
    );
  }

  return (<a onClick={onClick} className={classnames(cls, "aALHge LGgCZc internal-link sh-rov__current sh-rov__disabled")} aria-disabled={disabled} data-url="/shopping/product/r/US/279967834285244755/reviews?psb=1&amp;prds=cid:279967834285244755,cs:1,rate:5,rnum:10,sgro:or" tabIndex={-1} data-ved="0ahUKEwiPhJbuppDqAhWjUN4KHTaQBDIQn08IDigA">
    {children}
  </a>);
}

if (process.env.NODE_ENV !== 'production') {
  ReviewLinearProgress.displayName = 'penguin_ui_reviews__ReviewLinearProgress';
}

export default React.memo(ReviewLinearProgress);
