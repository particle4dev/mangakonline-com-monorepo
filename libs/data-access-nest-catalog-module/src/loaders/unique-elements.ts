export default function unique(arr: Array<any>): Array<any> {
  if (arr.length <= 1) return arr;

  // Turn all elements into strings, including arrays
  const stringElements = arr.map(key => JSON.stringify(key));

  // Get the unique elements by using an ES6 Set
  const uniqueElements = [...new Set(stringElements)];

  // Turn the non-string elements back into non-strings
  return uniqueElements.map(key => {
    // If it's e.g. an array, this will return the original array
    try {
      return JSON.parse(key);
    } catch (err) {
      // Oh, it was a string after all, let's just return that.
      return key;
    }
  });
}
