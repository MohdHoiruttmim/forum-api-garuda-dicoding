class DeleteCommentUseCase {
  constructor({ commentsRepository, threadRepository }) {
    this._commentRepository = commentsRepository;
    this._threadRepository = threadRepository;
  }

  async execute({ commentId, threadId, userId }) {
    await this._threadRepository.verifyAvailableThread(threadId);
    await this._commentRepository.verifyAvailableComment(commentId);
    await this._commentRepository.verifyCommentOwner(commentId, userId);
    await this._commentRepository.deleteCommentById(commentId);
  }
}

module.exports = DeleteCommentUseCase;
