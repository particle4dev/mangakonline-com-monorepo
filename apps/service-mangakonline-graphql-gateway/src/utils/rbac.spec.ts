import { SUPERADMIN, ADMIN, USER, GUEST } from '@mp-workspace/data-access-constants';
import { canAny, canAll } from './rbac';

describe('utils/rbac', () => {
  describe('canAny', () => {
    it('should return true', async (done) => {
      canAny([ADMIN, GUEST], 'remove', 'users', (err, data) => {
        if (err) {
          done(err);
        } else {
          expect(true).toEqual(data);
          done();
        }
      });
    });
    it('should return true', async (done) => {
      canAny([USER, GUEST], 'remove', 'users', (err, data) => {
        if (err) {
          done(err);
        } else {
          expect(false).toEqual(data);
          done();
        }
      });
    });

    describe('canAll', () => {
      it('should return true', async (done) => {
        canAll([ADMIN, SUPERADMIN], 'remove', 'users', (err, data) => {
          if (err) {
            done(err);
          } else {
            expect(true).toEqual(data);
            done();
          }
        });

      });
      it('should return true', async (done) => {
        canAll([ADMIN, USER], 'remove', 'users', (err, data) => {
          if (err) {
            done(err);
          } else {
            expect(false).toEqual(data);
            done();
          }
        });

      });
    });
  });
});
