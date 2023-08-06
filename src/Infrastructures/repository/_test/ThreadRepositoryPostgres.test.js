const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
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

  describe('verifyAvailableThread function', () => {
    it('should return error not found thread when thread not exist', async () => {
      // Arrange
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

      // Action and Assert
      await expect(threadRepositoryPostgres.verifyAvailableThread('thread-not'))
        .rejects.toThrowError(NotFoundError);
    });

    it('should not return not found error when thread exist', async () => {
      // Arrange
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

      //  Assert
      UsersTableTestHelper.addUser({
        id: 'user-010',
        username: 'user010',
        password: 'secret',
      });
      ThreadsTableTestHelper.addThreads({
        id: 'thread-010',
        owner: 'user-010',
      });

      // Action
      await expect(threadRepositoryPostgres.verifyAvailableThread('thread-010'))
        .resolves.not.toThrowError(NotFoundError);
    });
  });

  describe('addThread function', () => {
    it('should persist thread and return addedd thread correctly', async () => {
      // Arrange
      const payloadUserRegister = {
        id: 'user-089',
        username: 'user01',
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

  describe('getThread function', () => {
    it('should persist thread and return detail thread correctly', async () => {
      // Arrange
      const payloadUserRegister = {
        id: 'user-090',
        username: 'user02',
        password: 'secret',
      };
      const payloadAddThread = {
        id: 'thread-004',
        title: 'Lorem ipsum!',
        body: 'Lorem ipsum dolor sir amet amet cabang jakarta',
        owner: 'user-090',
      };

      await UsersTableTestHelper.addUser(payloadUserRegister);
      await ThreadsTableTestHelper.addThreads(payloadAddThread);

      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

      // Action
      const thread = await threadRepositoryPostgres.getThreadById(payloadAddThread.id);
      expect(thread).toStrictEqual({
        id: 'thread-004',
        title: 'Lorem ipsum!',
        body: 'Lorem ipsum dolor sir amet amet cabang jakarta',
        owner: 'user-090',
        date: new Date('2023-01-19T00:00:00.000Z'),
      });
    });
  });
});
