// https://github.com/mui-org/material-ui/blob/d10f8369897f9faa98548c7e51d6637e0f75e267/packages/material-ui-lab/src/Rating/Rating.js
import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { Section } from '@mp-workspace/ui-penguin-ui-material-ui-extension';
import Review, {ThumbnailReview} from '../Review';
import TitleSection from '../TitleSection';
import LoadingButton from '../LoadingButton';
// import NoSsr from '@material-ui/core/NoSsr'
import reviews from './reviews';

const debug = require('debug')('containers:ReviewsSection');

type IReviewsSectionProps = {
    onMouseMove?: (event: React.MouseEvent) => void,
    onMouseLeave?: (event: React.MouseEvent) => void,
    onChangeActive?: (event: React.ChangeEvent<{}>, value: number | null) => void,
    onChange?: (event: React.ChangeEvent<{}>, value: number | null) => void,
    max?: number,
    precision?: number
}

// z6XoBf fade-in-animate
const ReviewsSection = React.forwardRef(function ReviewsSection(props: IReviewsSectionProps, ref) {
  debug('render');

  const [loading, setLoading] = React.useState(false);

  const turnOffLoadingButton = () => {
    setLoading(false);
  };

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setLoading(true);

    setTimeout(turnOffLoadingButton, 5000);
  };
  // <Section id="reviews">

  return (
    <Section>
      <TitleSection title="Bài đánh giá" />
      {/*
        <NoSsr>
          <OverviewContainer />
        </NoSsr>
      */}
      {
        reviews.map((data, index) => {
          const images: any = data.images;

          return (<Review star={data.star} key={`review-${index}`}>
            {data.message && <Typography variant="body2">
              {data.message}
            </Typography>}
            {images.map((e: any, i: number) => (
              <ThumbnailReview size={52} src={e} key={`thumbnail__review__${i}`}/>
            ))}
          </Review>);
        })
      }

      <LoadingButton loading={loading} fullWidth onClick={onClick}>Bài đánh giá khác</LoadingButton>
    </Section>
  );
});

if(process.env.NODE_ENV !== 'production') {
  ReviewsSection.displayName = 'containers__ReviewsSection';
}

ReviewsSection.defaultProps = {};

export default ReviewsSection;
