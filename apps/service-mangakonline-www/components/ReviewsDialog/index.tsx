import * as React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import Fade from '@material-ui/core/Fade';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { TransitionProps } from '@material-ui/core/transitions';
import { WithStyles, createStyles, useTheme, withStyles, Theme } from '@material-ui/core';
import Scrollbar from "@mp-workspace/ui-penguin-ui-scrollbar";
import { OverviewContainer, ReviewLinearProgress } from '@mp-workspace/ui-penguin-ui-reviews';
import { SectionSpacingBottom } from '@mp-workspace/ui-penguin-ui-material-ui-extension';
import Review from '../Review';
import reviews from '../../reviews.json';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('components:ReviewsDialog');

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return fullScreen ? <Slide direction="left" ref={ref} timeout={0.6} {...props} /> : <Fade ref={ref} timeout={0.6} {...props} />;
});

const styles = (theme: Theme) => createStyles({
  flexContainer: {
    display: 'inline-flex',
    justifyContent: 'center',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  overview: {
    padding: `${theme.spacing(1)}px ${theme.spacing(3)}px`
  }
});

export type ReviewsDialogProps = WithStyles<typeof styles> & {
  value: boolean,
  onHandleClose: () => void;
};

const nameid = 'reviews-dialog';

const ReviewsDialog = React.forwardRef(function ReviewsDialog(props: ReviewsDialogProps, ref: React.Ref<HTMLElement>) {
  debug('render');
  const { classes, value, onHandleClose } = props;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const onClickChip = () => {};

  return (
    <Dialog
      ref={ref}
      fullScreen={fullScreen}
      open={value}
      onClose={onHandleClose}
      aria-labelledby={`${nameid}-title`}
      aria-describedby={`${nameid}-description`}
      TransitionComponent={Transition}
    >
      <AppBar color="inherit" elevation={0} position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={onHandleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6">
            Reviews
          </Typography>
        </Toolbar>
      </AppBar>

      <div className={classes.overview}>
        <OverviewContainer>
          <ReviewLinearProgress label="5 star" value={5}></ReviewLinearProgress>
          <ReviewLinearProgress label="4 star" value={4}></ReviewLinearProgress>
          <ReviewLinearProgress label="3 star" value={1}></ReviewLinearProgress>
          <ReviewLinearProgress label="2 star" value={0}></ReviewLinearProgress>
          <ReviewLinearProgress label="1 star" value={1}></ReviewLinearProgress>
        </OverviewContainer>
        <SectionSpacingBottom />
        <Scrollbar classes={{
          flexContainer: classes.flexContainer
        }}>
          <Chip label="All" color="primary" onClick={onClickChip} />
          <Chip label="Positive" variant="outlined" onClick={onClickChip} />
          <Chip label="Critical" variant="outlined" onClick={onClickChip} />
          <Chip label="5 Star" variant="outlined" onClick={onClickChip} />
          <Chip label="4 Star" variant="outlined" onClick={onClickChip} />
          <Chip label="3 Star" variant="outlined" onClick={onClickChip} />
          <Chip label="2 Star" variant="outlined" onClick={onClickChip} />
          <Chip label="1 Star" variant="outlined" onClick={onClickChip} />
        </Scrollbar>
      </div>
      <DialogContent>
        {
          reviews.map((data, index) => {
            // const images: any = data.images;
            return (<Review star={data.star} key={`review-${index}`}>
              {data.message && <Typography variant="body2">
                {data.message}
              </Typography>}
              {/* {images.map((e: any, i: number) => (
                <ThumbnailReview size={52} src={e} key={`thumbnail__review__${i}`}/>
              ))} */}
            </Review>);
          })
        }
      </DialogContent>
    </Dialog>
  );
});

if (process.env.NODE_ENV !== 'production') {
  ReviewsDialog.displayName = 'components__ReviewsDialog';
}

ReviewsDialog.defaultProps = {};

export default withStyles(styles, {name: 'ReviewsDialog'})(ReviewsDialog);
