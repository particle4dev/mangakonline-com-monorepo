// ./node_modules/.bin/ts-node -r tsconfig-paths/register -P ./tools/tsconfig.tools.json ./tools/scripts/sync-full-manges-mangadex-org.ts

import fetch from 'isomorphic-fetch';
import querystring from 'query-string';
import fs from 'fs';
import { URL } from 'url';
import data from './data.json';

const API_URL = 'https://api.mangadex.org';
const options = {
  method: 'GET',
  headers: {
    'cache-control': 'no-cache',
    accept: '*/*',
    'content-type': 'application/json',
    'sec-ch-ua-platform': '\\"macOS\\"',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua': '\\"Chromium\\";v=\\"94\\", \\"Google Chrome\\";v=\\"94\\", \\";Not A Brand\\";v=\\"99\\"'
  },
};

// https://api.mangadex.org/manga/18543708-eed6-4b84-b3fd-f67540b4ebbd?includes[]=artist&includes[]=author&includes[]=cover_art

function getMangaInfoFromMangadexorg(id, params = {}) {
  const url = new URL(`${API_URL}/manga/${id}`);
  url.search = querystring.stringify(params, {arrayFormat: 'bracket'});
  return fetch(url, options).then(response => response.json());
}

// https://api.mangadex.org/cover?manga[]=18543708-eed6-4b84-b3fd-f67540b4ebbd&limit=100
function getMangaCoverFromMangadexorg(mangas) {
  const url = new URL(`${API_URL}/cover`);
  url.search = querystring.stringify({
    manga: mangas,
    limit: 100
  }, {arrayFormat: 'bracket'});
  return fetch(url, options).then(response => response.json());
}

// https://api.mangadex.org/manga/18543708-eed6-4b84-b3fd-f67540b4ebbd/feed?limit=96&includes[]=scanlation_group&includes[]=user&order[volume]=desc&order[chapter]=desc&offset=0&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&contentRating[]=pornographic
function getMangaChapterFromMangadexorg(id, params = {}) {
  const url = new URL(`${API_URL}/manga/${id}/feed`);
  url.search = querystring.stringify(params, {arrayFormat: 'bracket'});
  return fetch(url, options).then(response => response.json());
}

async function main() {
  try {
    for(let i = 0; i < data.length; i+= 1) {
      // console.log(data[i], 'data[i]');
      // const manga = await getMangaInfoFromMangadexorg(data[i], {
      //   includes: ['artist', 'author', 'cover_art'],
      // });
      // console.log(JSON.stringify(manga), 'manga');
      // const cover = await getMangaCoverFromMangadexorg([data[i]]);
      // console.log(JSON.stringify(cover), 'cover');
      // const chapters = await getMangaChapterFromMangadexorg(data[i], {
      //   contentRating: [ 'safe', 'suggestive', 'erotica', 'pornographic' ],
      //   includes: [ 'scanlation_group', 'user' ],
      //   limit: '96',
      //   offset: '0',
      //   'order[chapter]': 'desc',
      //   'order[volume]': 'desc'
      // });
      // fs.writeFileSync("mangadex-chapter.json", JSON.stringify(chapters));
    }
  } catch (err) {
    console.error(err.message);
  }
}

main();


