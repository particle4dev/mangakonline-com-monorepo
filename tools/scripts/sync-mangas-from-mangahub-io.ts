// ./node_modules/.bin/ts-node -r tsconfig-paths/register -P ./tools/tsconfig.tools.json ./tools/scripts/sync-mangas-from-mangahub-io.ts
// Option:
// --url link to graphql. eg:  ./node_modules/.bin/ts-node -r tsconfig-paths/register -P ./tools/tsconfig.tools.json ./tools/scripts/sync-mangas-from-mangahub-io.ts --url 123

// var options = {
//   method: 'POST',
//   headers: {
//     'cache-control': 'no-cache',
//     accept: '*/*',
//     'content-type': 'application/json',
//     'sec-ch-ua-platform': '\\"macOS\\"',
//     'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36',
//     'sec-ch-ua-mobile': '?0',
//     'sec-ch-ua': '\\"Chromium\\";v=\\"94\\", \\"Google Chrome\\";v=\\"94\\", \\";Not A Brand\\";v=\\"99\\"'
//   },
//   body: JSON.stringify({
//     variables: {
//       slug: 'yaiba'
//     },
//     query: `query GET_MANGA_DATA_FROM_MANGAHUB_IO($slug: String!) {
//       manga(x: m01, slug: $slug) {
//         id
//         rank
//         title
//         slug
//         status
//         image
//         latestChapter
//         author
//         artist
//         genres
//         description
//         alternativeTitle
//         mainSlug
//         isYaoi
//         isPorn
//         isSoftPorn
//         unauthFile
//         noCoverAd
//         isLicensed
//         createdDate
//         updatedDate
//         chapters {
//           id
//           number
//           title
//           slug
//           date
//         }
//       }
//     }
//     `,
//   })
// };

// fetch('https://api.mghubcdn.com/graphql', options).then(response => response.json())
//   .then(data => console.log(data));

// mongo --host localhost

import fetch from 'isomorphic-fetch';
import minimist from 'minimist';
import { get } from 'dot-prop';
import data from './mangas.json';

const argv = minimist(process.argv.slice(2));

async function insertImageToMediaServer(url: string, alt: string): Promise<string | null>  {
  const graphql = argv['url'] || 'http://localhost:4300/graphql';

  // TODO: Catch error
  const { data, errors } = await fetch(graphql, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      variables: {
        input: {
          url,
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

async function insertMangaToCatalogServer(title: string, slug: string, cover: string, description: string, categories: string[], connections: string[]): Promise<string | null> {
  const graphql = argv['url'] || 'http://localhost:4300/graphql';

  // TODO: Catch error
  const { data, errors } = await fetch(graphql, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      variables: {
        input: {
          title,
          slug,
          cover,
          description,
          categories,
          connections
        },
        skipError: true
      },
      query: `mutation ($input: CreateNewBookInput!, $skipError: Boolean) {
        createNewBook(input: $input, skipError: $skipError) {
          book {
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

  // console.log(JSON.stringify(data), errors, result);
  return get(data, 'createNewBook.book._id', null);
}

async function getCategoryDataFromGateway(label: string) {
  const graphql = argv['url'] || 'http://localhost:4300/graphql';

  const { data, errors } = await fetch(graphql, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      variables: {
        label
      },
      query: `query GET_CATEGORY_DATA_FROM_GRAPHQL_GATEWAY($label: String!) {
        findCategoryByLabel(label: $label) {
          _id
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

  return get(data, 'findCategoryByLabel._id', null);
}

async function getMangaDataFromGateway(slug: string) {
  const graphql = argv['url'] || 'http://localhost:4300/graphql';

  const { data, errors } = await fetch(graphql, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      variables: {
        slug
      },
      query: `query GET_MANGA_DATA_FROM_GRAPHQL_GATEWAY($slug: String!) {
        findBookBySlug(slug: $slug) {
          _id
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
  
  return get(data, 'findBookBySlug', null);
}

async function main() {
  for(let i = 0; i < data.length; i+= 1) {
    const { manga } = data[i];

    const { image, slug, title, description, genres, connection } = manga;

    const m = await getMangaDataFromGateway(slug);
    let book = null;
    if(!m) {
      console.log(`insert ${slug} manga`);

      const categoriesLabel = genres.split(',').map((e: string) => e.trim());
      const categories = [];
      for(let i = 0; i < categoriesLabel.length; i+=1) {
        const category = await getCategoryDataFromGateway(categoriesLabel[i]);
        categories.push(category);
      }
      const connections = [connection];
      const cover = await insertImageToMediaServer(image, `${title} thumbnail`);
      console.log(cover, 'cover');
      book = await insertMangaToCatalogServer(title, slug, cover, description, categories, connections);
    } else {
      book = m._id;
    }
    if(!book) {
      throw new Error(`cant not create ${title} manga`);
    }
  }
}

main();
