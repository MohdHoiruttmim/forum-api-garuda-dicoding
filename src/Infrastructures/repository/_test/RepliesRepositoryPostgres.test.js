const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const RepliesTableTestHelper = require('../../../../tests/RepliesTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const PostReply = require('../../../Domains/threads/comments/replies/entities/PostReply');
const pool = require('../../database/postgres/pool');
const ReplyRepositoryPostgres = require('../RepliesRepositoryPostgres');

describe('ReplyRepositoryPostgres', () => {
  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('addReply function', () => {
    it('should persist comment reply and return added reply correctly', async () => {
      // Arrange
      const payloadUserRegister = { id: 'user-123' };
      await UsersTableTestHelper.addUser(payloadUserRegister);

      const payloadThread = { id: 'thread-123', owner: 'user-123' };
      await ThreadsTableTestHelper.addThreads(payloadThread);

      const payloadComment = { id: 'comment-123', threadId: 'thread-123', owner: 'user-123' };
      await CommentsTableTestHelper.addThreadComment(payloadComment);

      const payloadReply = new PostReply({
        content: 'ini adalah reply pertama',
        owner: payloadUserRegister.id,
        commentId: payloadComment.id,
      });
      const fakeIdGenerator = () => '123';
      const replyRepositoryPostgres = new ReplyRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      await replyRepositoryPostgres.addReply(payloadReply);

      // Assert
      const reply = await RepliesTableTestHelper.getReplyById('reply-123');
      expect(reply).toHaveLength(1);
    });
  });
});
