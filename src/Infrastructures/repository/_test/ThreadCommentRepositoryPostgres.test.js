const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const AuthorizationError = require('../../../Commons/exceptions/AuthorizationError');
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

  describe('verifyCommentOwner function', () => {
    it('should not grant access if user not the owner', async () => {
      // Arrange
      const payloadUserRegister1 = {
        id: 'user-56',
        username: 'userLimaNam',
      };
      const payloadUserRegister2 = {
        id: 'user-61',
        username: 'userNamSatu',
      };
      const payloadAddThread = {
        id: 'thread-66',
        owner: payloadUserRegister1.id,
      };
      const payloadAddComment = {
        id: 'comment-68',
        threadId: payloadAddThread.id,
        owner: payloadUserRegister1.id,
      };

      await UsersTableTestHelper.addUser(payloadUserRegister1);
      await UsersTableTestHelper.addUser(payloadUserRegister2);
      await ThreadsTableTestHelper.addThreads(payloadAddThread);
      await CommentsTableTestHelper.addThreadComment(payloadAddComment);

      const threadCommentRepositoryPostgres = new ThreadCommentRepositoryPostgres(pool, {});

      // Action and Assert
      await expect(threadCommentRepositoryPostgres.verifyCommentOwner('comment-68', 'user-61'))
        .rejects.toThrowError(AuthorizationError);
    });

    it('should grant access if user is owner', async () => {
      // Arrange
      const payloadUserRegister = {
        id: 'user-56',
        username: 'userLimaNam',
      };
      const payloadAddThread = {
        id: 'thread-66',
        owner: payloadUserRegister.id,
      };
      const payloadAddComment = {
        id: 'comment-68',
        threadId: payloadAddThread.id,
        owner: payloadUserRegister.id,
      };

      await UsersTableTestHelper.addUser(payloadUserRegister);
      await ThreadsTableTestHelper.addThreads(payloadAddThread);
      await CommentsTableTestHelper.addThreadComment(payloadAddComment);

      const threadCommentRepositoryPostgres = new ThreadCommentRepositoryPostgres(pool, {});

      // Action and Assert
      await expect(threadCommentRepositoryPostgres.verifyCommentOwner('comment-68', 'user-56'))
        .resolves.not.toThrowError(AuthorizationError);
    });
  });
});
