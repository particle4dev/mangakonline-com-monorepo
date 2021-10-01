import {
  updatePath,
} from '../actions';
import { UPDATE_PATH } from '../constants';

describe('containers/BrowseContext/actions/updatePath', () => {
  const params = {
    pathname: '/path',
    query: {}
  };
  it('should updatePath should create updatePath action', () => {
    expect(updatePath(params)).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: UPDATE_PATH,
      payload: {
        params
      }
    };

    expect(updatePath(params)).toEqual(expectedResult);
  });
});
