import getFilename from '../index';

describe('@penguin-ui/get-filename/src/getFilename', () => {
  it('should handle the getFilename correctly', () => {
    expect(getFilename('https://www.google.com/photos/about/static/images/logos/logo_photos_192px.svg')).toEqual('logo_photos_192px');
    expect(getFilename('libs/util-penguin-ui-get-filename/src/__tests__/getFilename.spec.ts')).toEqual('getFilename.spec');
    expect(getFilename('')).toEqual('');
  });
});
