class CommentsRepository {
  async addComment(threadId) {
    throw new Error('COMMENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getCommentById(commentId) {
    throw new Error('COMMENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async verifyAvailableComment(commentId) {
    throw new Error('COMMENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async verifyCommentOwner(commentId, userId) {
    throw new Error('COMMENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async deleteCommentById(commentId) {
    throw new Error('COMMENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = CommentsRepository;
