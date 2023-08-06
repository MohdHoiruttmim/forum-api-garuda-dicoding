const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const PostComment = require('../../../Domains/threads/comments/entities/PostComment');
const pool = require('../../database/postgres/pool');
const ThreadCommentRepositoryPostgres = require('../ThreadCommentRepositoryPostgres');

describe('ThreadCommentRepositoryPostgres', () => {
  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
    await CommentsTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('addThreadComment function', () => {
    it('should persist thread comment and return added thread comment correctly', async () => {
      // Arrange
      const payloadUserRegister = {
        id: 'user-321',
        username: 'user-321',
        password: 'user-321',
      };
      await UsersTableTestHelper.addUser(payloadUserRegister);
      const payloadThread = {
        id: 'thread-321',
        title: 'Lorem ipsum!',
        body: 'Lorem ipsum dolor sir amet amet dan kanwan kawan',
        owner: payloadUserRegister.id,
      };
      await ThreadsTableTestHelper.addThreads(payloadThread);
      const payloadThreadComment = new PostComment({
        content: 'ini comment pertama!',
        threadId: payloadThread.id,
        owner: payloadUserRegister.id,
      });
      const fakeIdGenerator = () => '321';
      const threadCommentRepositoryPostgres = new ThreadCommentRepositoryPostgres(
        pool,
        fakeIdGenerator,
      );
      await threadCommentRepositoryPostgres.addComment(payloadThreadComment);

      // Action
      const comment = await CommentsTableTestHelper.getCommentById('comment-321');
      expect(comment).toHaveLength(1);
    });
  });
});
