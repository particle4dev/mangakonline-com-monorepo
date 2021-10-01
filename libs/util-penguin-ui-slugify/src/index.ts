// https://gist.github.com/codeguy/6684588
import unaccented from '@mp-workspace/util-penguin-ui-unaccented';

type StringToSlugOptions = {
  lower?: boolean,
  replacement?: string
  charmap?: Record<string, string> | null
};

export default function stringToSlug(str: string, {
  lower = true,
  replacement = '-',
  charmap = null
}: StringToSlugOptions = {}): string {
  str = str.replace(/^\s+|\s+$/g, ''); // trim

  str = unaccented(str);

  if(charmap) {
    str = str.split('')
      // replace characters based on charMap
      .reduce((result, ch) => {
        return result + (charmap[ch] || ch);
      }, '');
  }

  if (lower) {
    str = str.toLowerCase();
  }

  str = str.replace(/[^a-zA-Z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, replacement) // collapse whitespace and replace by -
    .replace(/-+/g, replacement); // collapse dashes

  return str;
}
