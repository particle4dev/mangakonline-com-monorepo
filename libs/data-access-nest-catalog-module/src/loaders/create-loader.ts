import DataLoader from 'dataloader';
// import unique from './unique-elements';

/**
 * Create a dataloader instance for a request and type
 *
 * Usage:
 * createUserLoader = () => createLoader(users => getUsers(users), 'id');
 */
type FnIdexFieldFunc<K, V> = (data: V) => K;

type FnCacheKey<K> = (key: K) => string | K;

function createLoader<K, V, C = K>(
  indexField: FnIdexFieldFunc<K, V> | string = 'id',
  cacheKeyFn: FnCacheKey<K> = (key: K) => key
) {
  return (batchFn: DataLoader.BatchLoadFn<K, V>, options?: DataLoader.Options<K, V, C>): DataLoader<K, V, C> => {
    return new DataLoader((keys: Array<K>) => {
      // return batchFn(unique(keys)).then(
      return batchFn(keys).then(
        normalizeRethinkDbResults<K, V>(keys, indexField, cacheKeyFn)
      );
    }, options);
  };
}

// These helper functions were taken from the DataLoader docs
// https://github.com/facebook/dataloader/blob/master/examples/RethinkDB.md
function indexResults<K, V>(results, indexField: FnIdexFieldFunc<K, V> | string, cacheKeyFn) {
  const indexedResults = new Map();
  results.filter(Boolean).forEach(res => {
    const key =
      typeof indexField === 'function' ? indexField(res) : res[indexField];
    indexedResults.set(cacheKeyFn(key), res);
  });
  return indexedResults;
}

function normalizeRethinkDbResults<K, V>(keys: Array<K>, indexField: FnIdexFieldFunc<K, V> | string, cacheKeyFn) {
  return results => {
    const indexedResults = indexResults<K, V>(results, indexField, cacheKeyFn);
    return keys.map(val => indexedResults.get(cacheKeyFn(val)) || null);
  };
}

export default createLoader;
