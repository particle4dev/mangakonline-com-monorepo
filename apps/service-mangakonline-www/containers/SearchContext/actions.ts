import { createAction } from 'redux-actions';
import {
  UPDATE_PATH,
} from './constants';

type RouterParams = {
  pathname: string,
  query: any
}

export const updatePath = createAction(UPDATE_PATH, (params: RouterParams) => ({
  params
}));
