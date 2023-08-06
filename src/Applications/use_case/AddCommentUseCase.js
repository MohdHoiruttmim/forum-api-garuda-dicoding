const PostComment = require('../../Domains/threads/comments/entities/PostComment');

class AddCommentUseCase {
  constructor({ commentsRepository, threadRepository }) {
    this._commentsRepository = commentsRepository;
    this._threadRepository = threadRepository;
  }

  async execute(useCasePayload) {
    await this._threadRepository.verifyAvailableThread(useCasePayload.threadId);
    const postComment = new PostComment(useCasePayload);
    return this._commentsRepository.addComment(postComment);
  }
}

module.exports = AddCommentUseCase;
