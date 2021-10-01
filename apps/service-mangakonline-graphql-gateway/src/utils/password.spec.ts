import {
  hashPassword,
  comparePassword
} from './password';

describe('utils/password', () => {
  describe('hashPassword', () => {
    it('should return true', async (done) => {
      const pass = '123';
      const hash = await hashPassword(pass);
      expect(await comparePassword(pass, hash)).toEqual(true);
      done();
    });
  });
});
