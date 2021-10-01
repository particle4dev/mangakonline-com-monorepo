import isUndefined from 'lodash/isUndefined';
import isNull from 'lodash/isNull';
import isNumber from 'lodash/isNumber';
import isBoolean from 'lodash/isBoolean';
import toString from 'lodash/toString';

const a = /à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g;
const A = /À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g;
const e = /è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g;
const E = /È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g;
const i = /ì|í|ị|ỉ|ĩ/g;
const I = /Ì|Í|Ị|Ỉ|Ĩ/g;
const o = /ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g;
const O = /Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g;
const u = /ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g;
const U = /Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g;
const y = /ỳ|ý|ỵ|ỷ|ỹ/g;
const Y = /Ỳ|Ý|Ỵ|Ỷ|Ỹ/g;
const d = /đ/g;
const D = /Đ/g;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function unaccented(alias: any): string {
  if(isNull(alias) || isUndefined(alias))
    return '';
  if(isNumber(alias) || isBoolean(alias))
    return toString(alias);
  return alias
    .replace(a, "a")
    .replace(A, "A")
    .replace(e, "e")
    .replace(E, "E")
    .replace(i, "i")
    .replace(I, "I")
    .replace(o, "o")
    .replace(O, "O")
    .replace(u, "u")
    .replace(U, "U")
    .replace(y, "y")
    .replace(Y, "Y")
    .replace(D, "D")
    .replace(d, "d");
}
