import * as React from 'react';
import gql from 'graphql-tag';
import { get } from 'dot-prop';
import classnames from 'classnames';
import Link from 'next/link';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { DateFormat } from "@mp-workspace/ui-penguin-ui-react-time-ago";
import { ChapterDetailFragment, ChapterDetailFragment_categories } from './__generated__/ChapterDetailFragment';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('containers:MangaIdPageContent:DetailMangasMasthead');

export const chapterDetailFragment = gql`
  fragment ChapterDetailFragment on LibraryBookEntity {
    _id
    title
    totalChapters
    description
    createdAt
    categories {
      _id
      label
      slug
    }
    cover {
      _id
      findSize(type: "SMALL") {
        url
        width
        height
        type
      }
    }
  }
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      paddingTop: '80vw',
      paddingBottom: 5,
      backgroundColor: '#fff',
      // zIndex: 30,

      [theme.breakpoints.up('sm')]: {
        padding: 0,
        minHeight: 360
      },

      [theme.breakpoints.up('md')]: {
        minHeight: 460,
      },
    },

    background__wrapper: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      overflow: 'hidden'
    },

    background__base: {
      position: 'absolute',
      top: -2,
      right: -2,
      bottom: -2,
      left: -2
    },

    background__art: {
      width: '100%',
      opacity: 0.8
    },

    background__image: {
      flexShrink: 0,
      minWidth: '100%',
      minHeight: '100%',

      [theme.breakpoints.up('sm')]: {
        width: '48%',
        minWidth: 'auto',
        minHeight: 'auto',
        position: 'relative',
        flexShrink: 'inherit'
      },
    },

    detailentitymasthead__entity: {
      paddingBottom: 16,
      position: 'relative',
      paddingLeft: 20,
      paddingRight: 20,

      [theme.breakpoints.up('sm')]: {
        display: 'flex',
        position: 'absolute',
        alignItems: 'center',
        top: 0,
        bottom: 0,
        paddingTop: 'calc((75px - 16px)/2)',
        paddingBottom: 0,
        width: 'auto',
        height: 'auto',

        paddingLeft: 40,
        paddingRight: 40,
      },
    },

    detailentitymasthead__meta: {
      boxSizing: 'content-box',
      // color: #fff;

      [theme.breakpoints.up('sm')]: {
        maxWidth: 368
      },

      [theme.breakpoints.up('md')]: {
        maxWidth: 415
      },
    },

    detailentitymasthead__headline: {
      fontWeight: 600,
      fontStretch: 'normal',
      fontSize: '10px',
      lineHeight: '10px',
      opacity: 0.65,
      marginBottom: 8,
      letterSpacing: '1px',
      textTransform: 'uppercase',

      [theme.breakpoints.up('sm')]: {
        fontSize: '12px',
        lineHeight: '14px'
      },

      [theme.breakpoints.up('md')]: {
        marginBottom: 16
      },
    },

    detailentitymasthead__title: {
      fontWeight: 600,
      fontStretch: 'normal',
      margin: '0 0 12px',
      fontSize: '48px',
      lineHeight: '56px',
      width: '85%',
      letterSpacing: '-0.5px',
      position: 'relative',

      [theme.breakpoints.up('sm')]: {
        width: 'auto',
        fontSize: '24px',
        lineHeight: '30px',
        letterSpacing: '0.25px'
      },
    },

    detailentitymasthead__tags: {
      fontSize: '12px',
      lineHeight: '18px',
      letterSpacing: '0.65px',
      color: '#fff',
      opacity: 0.6,
      marginBottom: '16px',

      [theme.breakpoints.up('sm')]: {
        fontSize:' 14px',
        lineHeight: '21px',
        fontWeight: 500,
        marginBottom: 8,
        opacity: 1,
      },

      [theme.breakpoints.up('md')]: {
        fontSize: '14px',
        lineHeight: '21px',
        fontWeight: 600,
        marginBottom: 4
      },
    },

    detailentitymasthead__description: {
      marginBottom: 0,
      maxHeight: 'calc(2 * 24px)',
      overflow: 'hidden',
      fontSize: '12px',
      lineHeight: '18px',

      [theme.breakpoints.up('md')]: {
        fontSize: '14px',
        lineHeight: '21px'
      },
    }
  }),
);

type DetailMangasMastheadProps = {
  data: ChapterDetailFragment;
  onClickMore: () => void;
};

const DetailMangasMasthead = ({ data, onClickMore }: DetailMangasMastheadProps) => {
  debug('render');

  const classes = useStyles();
  const categories = get(data, 'categories', []);
  const createdAt = get(data, 'createdAt', null);

  return (
    <div className={classes.root}>
      <div className={classes.background__wrapper}>
        <div className={classnames(classes.background__base, 'Background__base')} style={{
          backgroundColor: 'rgb(51, 153, 153)'
        }}></div>
        <div className={classnames(classes.background__art, 'Background__art')} style={{
          backgroundImage: 'linear-gradient(80deg, rgb(51, 153, 153) 10%, rgba(51, 153, 153, 0) 20%); left: auto'
        }}>
          <div className="Background__picture" style={{
            textAlign: 'right'
          }}>
            <img className={classnames(classes.background__image, 'Background__image')}
              src={get(data, 'cover.findSize.url', '')}
              alt="" />
          </div>
        </div>
        <div className={classnames(classes.background__base, 'Background__color')}></div>
        <div className={classnames(classes.background__base, 'Background__overlay')}></div>
        <div className={classnames(classes.background__base, 'Background__gradient')} style={{
          backgroundImage: 'linear-gradient(245deg, rgba(51, 153, 153, 0) 35%, rgb(51, 153, 153) 70%)'
        }}></div>
        <div className={classnames(classes.background__base, 'Background__highlight')} style={{
          opacity: 0.7,
          backgroundImage: 'radial-gradient(at left top, rgb(51, 255, 255) 5%, rgba(51, 255, 255, 0) 70%'
        }}></div>
        <div className={classnames(classes.background__base, 'Background__scrim')} style={{
          opacity: 0.35,
          backgroundImage: 'linear-gradient(5deg, #000 0%, transparent 50%), radial-gradient(ellipse at top right, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 20%'
        }}></div>
      </div>

      <div className={classes.detailentitymasthead__entity}>
        <div className={classes.detailentitymasthead__meta}>
          <div className={classes.detailentitymasthead__headline}>{get(data, 'totalChapters', 0)} chapters available</div>
          <h1 className={classes.detailentitymasthead__title}><span>{get(data, 'title', '')}</span></h1>
          <div className={classes.detailentitymasthead__tags}>
            {categories.map((e: ChapterDetailFragment_categories) => <span key={`category-detail-manga-${e.slug}`}>
              <Link href="/genres/[id]" as={`/genres/${e.slug}`}>
                <a style={{
                  color: '#fff'
                }} aria-label={`View ${e.label} category`}>{e.label}</a></Link>{" • "}</span>)}
            {createdAt && <DateFormat value={createdAt} format="YYYY" />}
          </div>
          <p className={classes.detailentitymasthead__description}>
            {get(data, 'description', '').slice(0, 85)} <span>...<a type="button" role="button" tabIndex={0} className="DetailEntityMasthead__description-read-more" data-toggle="modal" data-target="#description-modal" data-events="utag" data-utag-object="event_name:detail_entity_read_more" onClick={onClickMore}>more</a></span>
          </p>
        </div>
      </div>
    </div>
  );
};

if (process.env.NODE_ENV !== 'production') {
  DetailMangasMasthead.displayName = 'containers__MangaIdPageContent_DetailMangasMasthead';
}

DetailMangasMasthead.defaultProps = {};

export default DetailMangasMasthead;
