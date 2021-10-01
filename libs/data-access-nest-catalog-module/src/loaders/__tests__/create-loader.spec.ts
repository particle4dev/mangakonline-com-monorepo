import createLoader from '../create-loader';

type UserType = {
  id: string;
  fullname: string;
};

describe('data-access-nest-catalog-module/loaders/create-loader', () => {
  const data: Array<UserType> = [
    {
      id: 'id1',
      fullname: 'user1'
    },
    {
      id: 'id2',
      fullname: 'user2'
    },
    {
      id: 'id3',
      fullname: 'user3'
    }
  ];

  it('indexField is id field', async done => {
    function getUsers(keys: readonly string[]): Promise<UserType[]> {
      return new Promise(resolve => {
        resolve(data.filter((k: UserType) => keys.indexOf(k.id) !== -1));
      });
    }

    const createUserLoader = createLoader<string, UserType>('id');
    const userLoader = createUserLoader(users => getUsers(users));

    expect(await userLoader.loadMany(['id1'])).toEqual([{
      id: 'id1',
      fullname: 'user1'
    }]);

    expect(await userLoader.load('id1')).toEqual({
      id: 'id1',
      fullname: 'user1'
    });

    expect(await userLoader.loadMany(['id1', 'id1'])).toEqual([{
      id: 'id1',
      fullname: 'user1'
    }, {
      id: 'id1',
      fullname: 'user1'
    }]);

    done();
  });

  it('indexField is fullname field', async done => {
    function getUsers(keys: readonly string[]): Promise<UserType[]> {
      return new Promise(resolve => {
        resolve(data.filter((k: UserType) => keys.indexOf(k.fullname) !== -1));
      });
    }

    const createUserLoader = createLoader<string, UserType>('fullname');
    const userLoader = createUserLoader(users => getUsers(users));

    expect(await userLoader.loadMany(['user1'])).toEqual([{
      id: 'id1',
      fullname: 'user1'
    }]);

    expect(await userLoader.load('user1')).toEqual({
      id: 'id1',
      fullname: 'user1'
    });

    expect(await userLoader.loadMany(['user1', 'user1'])).toEqual([{
      id: 'id1',
      fullname: 'user1'
    }, {
      id: 'id1',
      fullname: 'user1'
    }]);

    done();
  });

  it('indexField is function', async done => {
    function getUsers(keys: readonly string[]): Promise<UserType[]> {
      return new Promise(resolve => {
        resolve(data.filter((k: UserType) => keys.indexOf(k.fullname) !== -1));
      });
    }

    const createUserLoader = createLoader<string, UserType>((data: UserType) => data.fullname);
    const userLoader = createUserLoader(users => getUsers(users));

    expect(await userLoader.loadMany(['user1'])).toEqual([{
      id: 'id1',
      fullname: 'user1'
    }]);

    expect(await userLoader.load('user1')).toEqual({
      id: 'id1',
      fullname: 'user1'
    });

    expect(await userLoader.loadMany(['user1', 'user1'])).toEqual([{
      id: 'id1',
      fullname: 'user1'
    }, {
      id: 'id1',
      fullname: 'user1'
    }]);

    done();
  });

});
