import RBAC from 'rbac';
import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import {
  ROLES,
  PERMISSIONS,
  GRANTS,
} from '@mp-workspace/data-access-constants';

const rbac = new RBAC({
  roles: ROLES,
  permissions: PERMISSIONS,
  grants: GRANTS,
});

export function canAny(roleNames: string[], action: string, resource, cb, i = 0) {
  if (isString(roleNames)) {
    return rbac.can(roleNames, action, resource, cb);
  }
  if (isArray(roleNames)) {
    if (i === roleNames.length) {
      return cb(null, false);
    }
    return rbac.can(roleNames[i], action, resource, (err, data) => {
      if (err) {
        return cb(err);
      }
      if (data) {
        return cb(err, data);
      }
      return canAny(roleNames, action, resource, cb, i + 1);
    });
  }
  return cb(new Error('roleNames must be string or array'), false);
}

export function canAll(roleNames: string[], action: string, resource, cb, i = 0) {
  if (isString(roleNames)) {
    return rbac.can(roleNames, action, resource, cb);
  }
  if (isArray(roleNames)) {
    if (i === roleNames.length) {
      return cb(null, true);
    }
    return rbac.can(roleNames[i], action, resource, (err, data) => {
      if (err) {
        return cb(err);
      }
      if (!data) {
        return cb(err, data);
      }
      return canAny(roleNames, action, resource, cb, i + 1);
    });
  }
  return cb(new Error('roleNames must be string or array'), false);
}
