const PostComment = require('../../Domains/threads/comments/entities/PostComment');

class AddCommentUseCase {
  constructor({ commentsRepository }) {
    this._commentsRepository = commentsRepository;
  }

  async execute(useCasePayload) {
    const postComment = new PostComment(useCasePayload);
    await this._commentsRepository.verifyAvailableThread(postComment.threadId);
    return this._commentsRepository.addComment(postComment);
  }
}

module.exports = AddCommentUseCase;
