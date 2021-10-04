// ./node_modules/.bin/ts-node -r tsconfig-paths/register -P ./tools/tsconfig.tools.json ./tools/scripts/sync-genres-from-mangahub-io.ts
import fetch from 'isomorphic-fetch';
import { get } from 'dot-prop';
var request = require("request");

async function syncGenresFromMangahubIO() {


var options = { method: 'POST',
  url: 'https://api.mghubcdn.com/graphql',
  headers: 
   { 'postman-token': '11c02574-f610-a00b-09c6-36a47ebfeaf2',
     'cache-control': 'no-cache',
     accept: '*/*',
     'content-type': 'application/json',
     'sec-ch-ua-platform': '\\"macOS\\"',
     'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36',
     'sec-ch-ua-mobile': '?0',
     'sec-ch-ua': '\\"Chromium\\";v=\\"94\\", \\"Google Chrome\\";v=\\"94\\", \\";Not A Brand\\";v=\\"99\\"' },
  body: { query: 'query GET_ALL_GENRES_DATA_FROM_MANGAHUB_IO {genres {id slug title}}' },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body, '123');
});

  // const { data, errors } = await fetch('https://api.mghubcdn.com/graphql', {
  //   method: 'POST',
  //   // headers: { 'Content-Type': 'application/json' },
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
  //     // variables: {},
  //     query: `query GET_ALL_GENRES_DATA_FROM_MANGAHUB_IO {
  //       genres {
  //         id
  //         slug
  //         title
  //       }
  //     }
  //   `,
  //   }),
  // }).then(result => result.json());

  // if(errors) {
  //   for(let i = 0; i < errors.length; i+= 1) {
  //     const e = errors[i];
  //     console.error(`${e.message} in ${JSON.stringify(e.locations)}`);
  //   }
  // }

  // return get(data, 'genres', []);
  return [];
}

async function insertCategoryInDb(slug: string, label: string) {
  const { data, errors } = await fetch('http://localhost:4300/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      variables: {
        input: {
          slug,
          label,
        }
      },
      query: `mutation INSERT_CATEGORY_IN_DB($input: CreatingNewCategoryInput!) {
        createNewCategory(input: $input, skipError: true) {
          category {
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

  return get(data, 'createNewCategory.category._id', null);
}

async function main() {
  const genres = await syncGenresFromMangahubIO();

  for(let i = 0; i < genres.length; i+= 1) {
    const g = genres[i];
    const id = await insertCategoryInDb(g.slug, g.title);
    console.log(`insert ${g.title} category in db with "${id}" id`);
  }
}

main();
