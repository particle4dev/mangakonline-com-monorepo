import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
import Rating from '@material-ui/lab/Rating';
import { DateFormat } from "@mp-workspace/ui-penguin-ui-react-time-ago";

const debug = require('debug')('product-page:components:Review');

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    // borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: 'transparent'
  },

  root__content: {
    paddingLeft: 0,
    paddingRight: 0
  },

  root__date: {
    lineHeight: '20px',
    // color: '#777',
    fontSize: 13,

    whiteSpace: 'nowrap',

    // fontSize: '13px',
    marginLeft: 8
  }
}));

type IReviewProps = {
  star: number,
  children: React.ReactNode
}

// z6XoBf fade-in-animate
function Review(props: IReviewProps) {
  debug('render');

  const {
    star,
    children
  } = props;
  const classes = useStyles({});

  return (
    <Card elevation={0} className={classes.root}>
      {/* <CardContent className={classes.root__content}> */}
      <div className={classes.root__content}>
        <div className="less-spaced OP1Nkd nMkOOb" style={{
          margin: '12px 0',
          lineHeight: '20px',
          // color: '#777',
          fontSize: 13,
        }}>
          <div className="UzThIf" aria-label="5/5 sao" role="img" style={{
            display: 'inline-block',
            position: 'relative',
            top: 2,

            height: 14,
            width: 68
          }}>
            {/* <Rating aria-label="5/5 sao" role="img" value={star} max={5} readOnly style={{
              fontSize: 14,
              width: 68
            }} /> */}
            <Rating aria-label="5/5 sao" role="img" value={star} max={5} readOnly style={{
              fontSize: 14,
              width: 68
            }} />
          </div>
          <DateFormat value="2012-04-23T18:25:43.511Z" format="[Ngày] DD [tháng] MM [năm] YYYY" className={classes.root__date} />
        </div>
        {children}
        <div className="sPPcBf" style={{
          padding: '0 0 10px',
          marginTop: 12
        }}>
          everonhamlong<span className="oGzEp" style={{
            fontSize: 14
          }}> · </span>Bài đánh giá của <span>shopee.vn</span>
        </div>
      </div>
      {/* </CardContent> */}
    </Card>
  );
}

if (process.env.NODE_ENV !== 'production') {
  Review.displayName = 'containers__Review';
}

Review.defaultProps = {};

export default React.memo(Review);
