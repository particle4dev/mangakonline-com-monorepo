// ./node_modules/.bin/ts-node -r tsconfig-paths/register -P ./tools/tsconfig.tools.json ./tools/scripts/sync-chapters-from-mangahub-io.ts
// Option:
// --url link to graphql. eg:  ./node_modules/.bin/ts-node -r tsconfig-paths/register -P ./tools/tsconfig.tools.json ./tools/scripts/sync-chapters-from-mangahub-io.ts --url 123
// mongo --host localhost
// const z = await getChapterDataFromMangahubIO('yaiba', 150)

// function getChapterDataFromMangahubIO(slug, total) {
//   return new Promise(async (resolve, reject) => {
//     const result = [];
//     for(let i = 1; i <= total; i+=1) {
//       const options = {
//         method: 'POST',
//         headers: {
//           'cache-control': 'no-cache',
//           accept: '*/*',
//           'content-type': 'application/json',
//           'sec-ch-ua-platform': '\\"macOS\\"',
//           'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36',
//           'sec-ch-ua-mobile': '?0',
//           'sec-ch-ua': '\\"Chromium\\";v=\\"94\\", \\"Google Chrome\\";v=\\"94\\", \\";Not A Brand\\";v=\\"99\\"'
//         },
//         body: JSON.stringify({
//           variables: {
//             slug,
//             id: i
//           },
//           query: `query GET_CHAPTER_DATA_FROM_MANGAHUB_IO($slug: String!, $id: Float!) {
//             chapter(x: m01, slug: $slug, number: $id) {
//               id
//               title
//               mangaID
//               number
//               slug
//               date
//               pages
//               noAd
//               manga {
//                 id
//                 title
//                 slug
//                 mainSlug
//                 author
//                 isWebtoon
//                 isYaoi
//                 isPorn
//                 isSoftPorn
//                 unauthFile
//                 isLicensed
//               }
//             }
//           }
//         `,
//         })
//       };
    
//       const { data } = await fetch('https://api.mghubcdn.com/graphql', options).then(response => response.json());
//       result.push(data.chapter);
//     }
//     return resolve(result);
//   });
// }

import fetch from 'isomorphic-fetch';
import minimist from 'minimist';
import { Types } from 'mongoose';
import { get } from 'dot-prop';
import slugify from '@mp-workspace/util-penguin-ui-slugify';
import values from 'lodash/values';
import data from './chapters.json';

const argv = minimist(process.argv.slice(2));
const MANGAHUB_IO_MEDIA_IMG_SERVER = "https://img.mghubcdn.com";

async function getBookFromGateway(slug: string) {
  const url = argv['url'] || 'http://localhost:4300/graphql';

  const { data, errors } = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      variables: {
        slug
      },
      query: `query GET_BOOK_FROM_GATEWAY($slug: String!) {
        book: findBookBySlug(slug: $slug) {
          _id
          slug
          title
        }
      }
    `,
    }),
  }).then(result => result.json());

  if(errors) {
    for(let i = 0; i < errors.length; i+= 1) {
      const e = errors[i];
      console.error(`${e.message} in ${JSON.stringify(e.locations)}`);
    }
  }

  return get(data, 'book', null);
}

async function insertImagesToMediaServer(input: {
  url: string,
  alt: string
}[]): Promise<string[] | null>  {
  const url = argv['url'] || 'http://localhost:4300/graphql';

  // TODO: Catch error
  input = input.map(e => ({
    url: `${MANGAHUB_IO_MEDIA_IMG_SERVER}/file/imghub/${e.url}`,
    alt: e.alt
  }));
  const { data, errors } = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      variables: {
        input
      },
      query: `mutation INSERT_IMAGES_TO_MEDIA_SERVER($input: [AddNewPictureURLInput]!) {
        addNewPicturesURL(input: $input) {
          pictures {
            _id
          }
        }
      }
    `,
    }),
  }).then(result => result.json());

  if(errors) {
    for(let i = 0; i < errors.length; i+= 1) {
      const e = errors[i];
      console.error(`${e.message} in ${JSON.stringify(e.locations)}`);
    }
  }

  const pictures = get(data, 'addNewPicturesURL.pictures', []);

  return pictures.map(e => e._id);
}

async function insertImageToMediaServer(url: string, alt: string): Promise<string | null>  {
  const graphql = argv['url'] || 'http://localhost:4300/graphql';

  // TODO: Catch error
  const { data, errors } = await fetch(graphql, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      variables: {
        input: {
          url: `${MANGAHUB_IO_MEDIA_IMG_SERVER}/file/imghub/${url}`,
          alt
        }
      },
      query: `mutation INSERT_IMAGE_TO_MEDIA_SERVER($input: AddNewPictureURLInput!) {
        addNewPictureURL(input: $input) {
          picture {
            _id
          }
        }
      }
    `,
    }),
  }).then(result => result.json());

  if(errors) {
    for(let i = 0; i < errors.length; i+= 1) {
      const e = errors[i];
      console.error(`${e.message} in ${JSON.stringify(e.locations)}`);
    }
  }

  return get(data, 'addNewPictureURL.picture._id', null);
}

async function insertChapterToCatalogServer(input: {
  slug: string,
  title: string,
  book:  Types.ObjectId | string,
  cover: string,
  number: number,
  images: string[],
  releaseDate: Date,
  connections: string[],
}): Promise<string | null>  {
  // TODO: Catch error
  const graphql = argv['url'] || 'http://localhost:4300/graphql';

  const { data, errors } = await fetch(graphql, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      variables: {
        input
      },
      query: `mutation INSERT_CHAPTER_TO_CATALOG_SERVER($input: CreateNewChapterInput!) {
        createNewChapter(input: $input) {
          chapter {
            _id
          }
        }
      }
    `,
    }),
  }).then(result => result.json());

  if(errors) {
    for(let i = 0; i < errors.length; i+= 1) {
      const e = errors[i];
      console.error(`${e.message} in ${JSON.stringify(e.locations)}`);
    }
  }

  const id = get(data, 'createNewChapter.chapter._id', null);

  return id;
}

async function main() {
  for(let i = 0; i <= data.length; i += 1) {
    const chapter = data[i];
    const b = await getBookFromGateway(chapter.manga.slug);

    const { slug, title } = b;
    const { pages, date } = chapter;
    const listImages = values(JSON.parse(pages));
    const input = listImages.map(i => ({
      url: i,
      alt: `${title} chapter ${chapter.number} #${i}`
    }));
    const coverImage = input.shift();
    const cover = await insertImageToMediaServer(coverImage.url, coverImage.alt);
    const images  = await insertImagesToMediaServer(input);
    images.unshift(cover);

    let chapterSlug = chapter.slug;
    if(!chapterSlug || chapterSlug === '') {
      chapterSlug = slugify(`chapter-${chapter.number}`);
    }
  
    chapterSlug = slugify(`${slug}-${chapterSlug}`, {
      charmap: {
        _: '-'
      }
    });
  
    const result = await insertChapterToCatalogServer({
      slug: chapterSlug,
      title: chapter.title,
      book: b.id,
      cover,
      number: chapter.number,
      images,
      releaseDate: new Date(date),
      // connections: [event.getLink()]
      connections: []

    });
  
    console.log(result, 'result chapter_event_created');
  }
}

main();
