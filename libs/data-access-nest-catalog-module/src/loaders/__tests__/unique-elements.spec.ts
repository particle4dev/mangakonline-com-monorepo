import unique from '../unique-elements';

describe('data-access-nest-catalog-module/loaders/unique-elements', () => {
  it('should be defined', () => {
    expect(unique([])).toEqual([]);

    expect(unique(['1', '1'])).toEqual(['1']);

    expect(unique([{x: 1}, {x: 1}])).toEqual([{x: 1}]);
  });
});
