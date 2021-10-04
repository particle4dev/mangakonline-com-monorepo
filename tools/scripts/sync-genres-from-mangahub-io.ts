// ./node_modules/.bin/ts-node -r tsconfig-paths/register -P ./tools/tsconfig.tools.json ./tools/scripts/sync-genres-from-mangahub-io.ts
// curl -X POST \
//   https://api.mghubcdn.com/graphql \
//   -H 'accept: */*' \
//   -H 'cache-control: no-cache' \
//   -H 'content-type: application/json' \
//   -H 'postman-token: 5e00d06d-a0cc-3fdd-8ac1-aa6c975cff03' \
//   -H 'sec-ch-ua: \"Chromium\";v=\"94\", \"Google Chrome\";v=\"94\", \";Not A Brand\";v=\"99\"' \
//   -H 'sec-ch-ua-mobile: ?0' \
//   -H 'sec-ch-ua-platform: \"macOS\"' \
//   -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36' \
//   -d '{"query":"query GET_ALL_GENRES_DATA_FROM_MANGAHUB_IO {genres {id slug title}}"}'

import fetch from 'isomorphic-fetch';
import { get } from 'dot-prop';
import { data } from './genres.json';

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
  const genres = get(data, 'genres', []);

  for(let i = 0; i < genres.length; i+= 1) {
    const g = genres[i];
    const id = await insertCategoryInDb(g.slug, g.title);
    console.log(`insert ${g.title} category in db with "${id}" id`);
  }
}

main();
