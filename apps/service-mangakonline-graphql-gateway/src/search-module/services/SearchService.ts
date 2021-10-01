import { MeiliSearch } from 'meilisearch';

export default new MeiliSearch({
  host: process.env.MEILISEARCH_HOST,
  apiKey: process.env.MEILISEARCH_KEY,
});
