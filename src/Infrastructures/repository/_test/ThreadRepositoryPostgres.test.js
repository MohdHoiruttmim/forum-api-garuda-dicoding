const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const PostThread = require('../../../Domains/threads/entities/PostThread');
const pool = require('../../database/postgres/pool');
const ThreadRepositoryPostgres = require('../ThreadRepositoryPostgres');

describe('ThreadRepositoryPostgres', () => {
  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('addThread function', () => {
    it('should persist thread and return addedd thread correctly', async () => {
      // Arrange
      const payloadUserRegister = {
        id: 'user-089',
        username: 'himawan',
        password: 'secret',
      };
      await UsersTableTestHelper.addUser(payloadUserRegister);
      const payloadAddThread = new PostThread({
        title: 'Lorem ipsum!',
        body: 'Lorem ipsum dolor sir amet amet cabang bai',
        owner: payloadUserRegister.id,
      });
      const fakeIdGenerator = () => '123';
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);
      await threadRepositoryPostgres.addThread(payloadAddThread);

      // Action
      const thread = await ThreadsTableTestHelper.getThreadsById('thread-123');
      expect(thread).toHaveLength(1);
    });
  });
});
