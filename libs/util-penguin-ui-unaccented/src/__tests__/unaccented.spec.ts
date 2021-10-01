import unaccented from '../index';

describe('@penguin/unaccented/src/unaccented', () => {
  it('should handle the unaccented correctly', () => {
    expect(unaccented('Cháu xin chào cô chú! Sa chào cô chú đi con.')).toEqual('Chau xin chao co chu! Sa chao co chu di con.');
    expect(unaccented('')).toEqual('');
    expect(unaccented(null)).toEqual('');
    expect(unaccented(1)).toEqual('1');
    expect(unaccented(true)).toEqual('true');
    expect(unaccented('ÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴ')).toEqual('AAAAAAAAAAAAAAAAA');
    expect(unaccented('ÈÉẸẺẼÊỀẾỆỂỄ')).toEqual('EEEEEEEEEEE');
    expect(unaccented('ÌÍỊỈĨ')).toEqual('IIIII');
    expect(unaccented('ÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠ')).toEqual('OOOOOOOOOOOOOOOOO');
    expect(unaccented('ÙÚỤỦŨƯỪỨỰỬỮ')).toEqual('UUUUUUUUUUU');
    expect(unaccented('ỲÝỴỶỸ')).toEqual('YYYYY');
    expect(unaccented('Đ')).toEqual('D');
  });
});
