const CommentsRepository = require('../CommentsRepository');

describe('CommentsRepository Interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const commentsRepository = new CommentsRepository();

    // Action and Assert
    await expect(commentsRepository.addComment({})).rejects.toThrowError('COMMENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(commentsRepository.verifyAvailableThread('')).rejects.toThrowError('COMMENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(commentsRepository.getCommentById('')).rejects.toThrowError('COMMENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
