// Manga Page
import * as React from 'react';
import gql from 'graphql-tag';
import { get } from 'dot-prop';
import { useQuery, NetworkStatus } from '@apollo/client';
import Link from 'next/link';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import { Content, Section, Headline, SectionSpacingBottom, TabContainer, ProgressBar, HideOnScroll } from '@mp-workspace/ui-penguin-ui-material-ui-extension';
import { OverviewContainer, ReviewLinearProgress } from '@mp-workspace/ui-penguin-ui-reviews';
import HeadDescriptionMetaTag from '@mp-workspace/ui-next-description-meta-tag';
import HeadTitle from '@mp-workspace/ui-next-title-meta-tag';
import Review from '../../components/Review';
import AboutMangaDialog from '../../components/AboutMangaDialog';
import ReviewsDialog from '../../components/ReviewsDialog';
// import Navbar from '../Navbar';
import BackNavbar from '../BackNavbar';
import ChapterList, { chaptersBookFragment } from './ChapterList';
import DetailMangasMasthead, { chapterDetailFragment } from './DetailMangasMasthead';
import ScrollbarBooks, { scrollbarBooksFragment } from '../ScrollbarBooks';
import MangaPageTabs from './MangaPageTabs';
import reviews from '../../reviews.json';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('containers:MangaIdPageContent');

const linearProgress = <ProgressBar />;

const limit = 12;

const MANGA_ID_PAGE_QUERY = gql`
  query MANGA_ID_PAGE_QUERY($slug: String!, $first: Int, $offset: Int, $skipReviews: Boolean = false, $skipBook: Boolean = false) {
    getReviews @skip(if: $skipReviews) {
      id
    }

    book: findBookBySlug(slug: $slug) @skip(if: $skipBook) {
      _id
      ...ChapterDetailFragment

      relatedBooks {
        _id
        ...ScrollbarBooksFragment
      }
    }

    chapters: findChaptersByBookSlugOffsetPaging(slug: $slug, first: $first, offset: $offset) {
      edges {
        ...ChaptersBookFragment
      }
      pageInfo {
        offset
        limit
        total
      }
    }
  }
  ${chaptersBookFragment}
  ${chapterDetailFragment}
  ${scrollbarBooksFragment}
`;

type MangaIdPageContentProps = {
  slug: string
}

const MangaIdPageContent = ({ slug }: MangaIdPageContentProps) => {
  debug('render');

  const [tab, setTab] = React.useState(0);
  const onChangeTab = (event: React.MouseEvent, value: number) => {
    setTab(value);
  };

  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    MANGA_ID_PAGE_QUERY,
    {
      variables: {
        slug,
        first: limit,
        offset: 0,
        skipReviews: false,
        skipBook: false
      },
      // Setting this value to true will make the component rerender when
      // the "networkStatus" changes, so we are able to know if it is fetching
      // more data
      notifyOnNetworkStatusChange: true,
      // fetchPolicy: "cache-and-network"
    }
  );

  const onFetchMore = (event, value) => {
    fetchMore({
      variables: {
        slug,
        first: limit,
        offset: (value - 1) ? (value - 1) * limit : 0,
        skipReviews: true,
        skipBook: true
      },
      // updateQuery: (previousResult, { fetchMoreResult }) => {
      //   console.log(previousResult, fetchMoreResult, 'previousResult, fetchMoreResult');
      //   return {
      //     ...previousResult,
      //     ...fetchMoreResult
      //   };
      // },
    });
  };

  const loadingMorePosts = networkStatus === NetworkStatus.fetchMore;

  const [dialogState, setDialogState] = React.useState({
    about: false,
    reviews: false
  });

  const handleClickOpenAboutDialog = () => {
    setDialogState({
      ...dialogState,
      about: true
    });
  };

  const handleCloseAboutDialog = () => {
    setDialogState({
      ...dialogState,
      about: false
    });
  };

  const handleClickOpenReviewsDialog = evt => {
    evt.preventDefault();

    setDialogState({
      ...dialogState,
      reviews: true
    });
  };

  const handleCloseReviewsDialog = () => {
    setDialogState({
      ...dialogState,
      reviews: false
    });
  };

  const total = get(data, 'chapters.pageInfo.total', 0);

  const pages = Math.ceil(get(data, 'chapters.pageInfo.total', 0) / limit);

  return (
    <>
      <HeadDescriptionMetaTag description={get(data, 'book.description', null)} />
      <HeadTitle title={`Read ${get(data, 'book.title', null)} Online for Free | ${process.env.NEXT_PUBLIC_SITE_NAME}`} />
      {loading && linearProgress}
      <HideOnScroll>
        <BackNavbar style={{
          backgroundColor: 'transparent',
        }}/>
      </HideOnScroll>
      <Content top={0} bottom={16}>
        <DetailMangasMasthead data={get(data, 'book', null)} onClickMore={handleClickOpenAboutDialog} />
        <Section>
          <SectionSpacingBottom />
          {/* <Grid container spacing={3}>
            <Grid item xs={3} style={{
            }}>
              <IconButton aria-label="subscribe" style={{magin: '0 auto'}}>
                <BookmarkIcon fontSize="large" />
              </IconButton>
            </Grid>
            <Grid item xs={3} alignContent="center" alignItems="center" justify="center">
              <Typography variant="subtitle1">
                1063
              </Typography>

              <Typography variant="subtitle2">
                Subscribers
              </Typography>
            </Grid>
            <Grid item xs={3}>3</Grid>
            <Grid item xs={3}>4</Grid>
          </Grid> */}

          <MangaPageTabs defaultValue={tab} onChange={onChangeTab} />

          <TabContainer selected={tab === 0}>
            <SectionSpacingBottom />

            <div style={{
              display: 'flex',
              flexDirection: 'row',
            }}>
              <Typography component={'span'} variant="h5">Page</Typography>
              <Pagination count={pages} hidePrevButton hideNextButton style={{
                marginLeft: 16
              }} onChange={onFetchMore}
              renderItem={item => (
                <PaginationItem
                  {...item}
                  page={(`${total - (item.page - 1) * limit} - ${(total - item.page * limit) < 0 ? 0 : (total - item.page * limit)}`) as any}
                  size="large"
                />
              )}
              />
            </div>

            <SectionSpacingBottom />

            <ChapterList data={get(data, 'chapters.edges', [])} />
          </TabContainer>

          <TabContainer selected={tab === 1}>
            <SectionSpacingBottom />
            <Headline action={
              <IconButton aria-label="forward" size="small" color="primary" onClick={handleClickOpenAboutDialog}>
                <ArrowForwardIcon />
              </IconButton>
            }>About this manga</Headline>

            <SectionSpacingBottom />
            <Typography>
              {get(data, 'book.description', '')}
            </Typography>
          </TabContainer>

          <SectionSpacingBottom />
          <Headline action={
            <IconButton aria-label="forward" size="small" color="primary" onClick={handleClickOpenReviewsDialog}>
              <ArrowForwardIcon />
            </IconButton>
          }>Ratings and reviews</Headline>

          <SectionSpacingBottom />
          <OverviewContainer>
            <ReviewLinearProgress label="5 star" value={5}></ReviewLinearProgress>
            <ReviewLinearProgress label="4 star" value={4}></ReviewLinearProgress>
            <ReviewLinearProgress label="3 star" value={1}></ReviewLinearProgress>
            <ReviewLinearProgress label="2 star" value={0}></ReviewLinearProgress>
            <ReviewLinearProgress label="1 star" value={1}></ReviewLinearProgress>
          </OverviewContainer>

          <SectionSpacingBottom />
          {
            reviews.slice(0, 1).map((data, index) => {
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

          <Link href="#all-reviews">
            <a onClick={handleClickOpenReviewsDialog} style={{
              textDecoration: 'none'
            }}><Typography>All reviews</Typography></a>
          </Link>

          <SectionSpacingBottom />
          <Headline subheader="Rate this manga">Tell others what you think</Headline>

          <SectionSpacingBottom />

          <ScrollbarBooks data={get(data, 'book.relatedBooks', [])} label="You may also like" loading={loading} />

        </Section>
      </Content>
      <AboutMangaDialog
        description={get(data, 'book.description', null)}
        genres={get(data, 'book.categories', [])}
        publishedOn={get(data, 'book.createdAt', '')}
        value={dialogState.about}
        onHandleClose={handleCloseAboutDialog}
      />
      <ReviewsDialog value={dialogState.reviews} onHandleClose={handleCloseReviewsDialog} />
    </>
  );
};

if (process.env.NODE_ENV !== 'production') {
  MangaIdPageContent.displayName = 'containers__MangaIdPageContent';
}

MangaIdPageContent.defaultProps = {};

export default MangaIdPageContent;
