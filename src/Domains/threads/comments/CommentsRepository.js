class CommentsRepository {
  async addComment(threadId) {
    throw new Error('COMMENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async verifyAvailableThread(threadId) {
    throw new Error('COMMENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getCommentById(commentId) {
    throw new Error('COMMENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = CommentsRepository;
