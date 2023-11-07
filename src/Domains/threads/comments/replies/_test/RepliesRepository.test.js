const ReplyRepository = require('../RepliesRepository');

describe('RepliesRepository Interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const repliesRepository = new ReplyRepository();

    // Action and Assert
    await expect(repliesRepository.addReply({}))
      .rejects.toThrowError('REPLIES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
