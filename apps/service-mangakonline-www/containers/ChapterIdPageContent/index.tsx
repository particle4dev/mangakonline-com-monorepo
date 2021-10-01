import * as React from 'react';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import { get } from 'dot-prop';
import { useQuery, NetworkStatus } from '@apollo/client';
import { Content, Section, SectionSpacingBottom, Headline, GridScreen, HideOnScroll } from '@mp-workspace/ui-penguin-ui-material-ui-extension';
import HeadDescriptionMetaTag from '@mp-workspace/ui-next-description-meta-tag';
import HeadTitle from '@mp-workspace/ui-next-title-meta-tag';
import OGBasicMetaTag from '@mp-workspace/ui-next-og-meta-tag';
import { BasicCard, SummaryCard } from '@mp-workspace/ui-next-twitter-card-meta-tag';
import getFullURL from '../../utils/getFullURL';
import ScrollbarBooks, { scrollbarBooksFragment } from '../ScrollbarBooks';
import ScrollbarChapters, { scrollbarChaptersFragment } from '../ScrollbarChapters';
import BackNavbar from '../BackNavbar';
// import ContinueTheManga from '../ContinueTheManga';
import {
  CHAPTER_ID_PAGE_QUERY_chapter_images,
  CHAPTER_ID_PAGE_QUERY_chapter_images_sizes
} from './__generated__/CHAPTER_ID_PAGE_QUERY';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('containers:ChapterIdPageContent');

const CHAPTER_ID_PAGE_QUERY = gql`
  query CHAPTER_ID_PAGE_QUERY($slug: String!) {
    chapter: findChapterBySlug(slug: $slug) {
      _id
      slug
      number
      title
      cover {
        _id
        alt
        sizes {
          url
        }
      }
      book {
        _id
        slug
        title
        description
        relatedBooks {
          _id
          ...ScrollbarBooksFragment
        }
      }
      images {
        _id
        alt
        sizes {
          url
        }
      }
      nextChapter {
        _id
        ...ScrollbarChaptersFragment

      }
    }
  }
  ${scrollbarBooksFragment}
  ${scrollbarChaptersFragment}
`;

type ChapterIdPageContentProps = {
  slug: string
}

const ChapterIdPageContent = ({ slug }: ChapterIdPageContentProps) => {
  debug('render');

  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    CHAPTER_ID_PAGE_QUERY,
    {
      variables: {
        slug
      },
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-first",
      // Setting this value to true will make the component rerender when
      // the "networkStatus" changes, so we are able to know if it is fetching
      // more data
      notifyOnNetworkStatusChange: true,
    }
  );

  const loadingMorePosts = networkStatus === NetworkStatus.fetchMore;

  console.log(loadingMorePosts, data, error, loading, 'slug');
  let images: CHAPTER_ID_PAGE_QUERY_chapter_images[] = [];
  if(!loading) {
    images = get(data, 'chapter.images', []);
  }

  const router = useRouter();
  const url = getFullURL({
    pathname: router.asPath
  });

  const titleMetaTag = `Read Chapter ${get(data, 'chapter.number', null)} of ${get(data, 'chapter.book.title', null)} manga online for Free | ${process.env.NEXT_PUBLIC_SITE_NAME}`;
  const descriptionMetaTag = `Read Chapter ${get(data, 'chapter.number', null)} of ${get(data, 'chapter.book.title', null)} manga - ${get(data, 'chapter.book.description', null)}`;
  const image = get(data, 'chapter.cover.sizes.0.url', null);

  return (
    <>
      <HeadDescriptionMetaTag description={descriptionMetaTag} />
      <HeadTitle title={titleMetaTag} />
      <BasicCard />
      <SummaryCard
        title={titleMetaTag}
        description={descriptionMetaTag}
        image={image}
      />
      <OGBasicMetaTag
        description={descriptionMetaTag}
        title={titleMetaTag}
        url={url}
        image={image}
      />
      <HideOnScroll>
        <BackNavbar />
      </HideOnScroll>
      <Content top={64} bottom={72}>
        <Section>
          {images.map((image: CHAPTER_ID_PAGE_QUERY_chapter_images, key: number) => {
            const size: CHAPTER_ID_PAGE_QUERY_chapter_images_sizes = get(image, 'sizes.0');
            return size ? (
              <div key={`chapter-id-${slug}-${key}`}>
                <img src={size.url} style={{
                  maxWidth: '100%',
                  minHeight: 200,
                  background: '#eaeaea',
                  display: 'block',
                  position: 'relative',
                  marginLeft: 'auto',
                  marginRight: 'auto'
                }} alt={image.alt} />
                <p className="_3w1ww" style={{
                  textAlign: 'center'
                }}>{key + 1}/{images.length}</p>
              </div>
            ) : null;
          })}
          <SectionSpacingBottom />

          {/* <ContinueTheManga slug={get(data, 'chapter.book.slug', null)} onEnterViewport={() => console.log('enter')} onLeaveViewport={() => console.log('leave')} /> */}

          <ScrollbarChapters data={get(data, 'chapter.nextChapter', [])} label="Continue the manga" loading={loading} />

          <ScrollbarBooks data={get(data, 'chapter.book.relatedBooks', [])} label="You may also like" loading={loading} />

        </Section>
      </Content>
    </>
  );
};

if (process.env.NODE_ENV !== 'production') {
  ChapterIdPageContent.displayName = 'containers__ChapterIdPageContent';
}

ChapterIdPageContent.defaultProps = {};

export default ChapterIdPageContent;
