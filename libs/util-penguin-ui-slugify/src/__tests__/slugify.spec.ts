import slugify from '../index';

describe('@penguin-ui/slugify/src/slugify', () => {
  it('should handle the slugify correctly', () => {
    expect(slugify(' abc ')).toEqual('abc'); // trim
    expect(slugify('ABC')).toEqual('abc'); // to lower case
    expect(slugify('ÁBC')).toEqual('abc'); // remove accented char
    expect(slugify('@bc')).toEqual('bc'); // remove invalid chars
    expect(slugify('a    b c')).toEqual('a-b-c'); // collapse whitespace and replace by -
    expect(slugify('a  --  b c')).toEqual('a-b-c'); // collapse dashes
    expect(slugify('sweet-guy_132-chapter-29-5')).toEqual('sweet-guy132-chapter-29-5');
    expect(slugify('sweet-guy_132-chapter-29-5', {
      replacement: '_'
    })).toEqual('sweet_guy132_chapter_29_5');
    expect(slugify('sweet-guy_132-chapter-29-5', {
      charmap: {
        _: '-'
      }
    })).toEqual('sweet-guy-132-chapter-29-5');
    expect(slugify('ÁBC', {
      lower: false
    })).toEqual('ABC');
  });
});
