const PostReply = require('../../Domains/threads/comments/replies/entities/PostReply');

class AddReplyUseCase {
  constructor({ replyRepository, threadRepository, commentRepository }) {
    this._replyRepository = replyRepository;
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
  }

  async execute(useCasePayload) {
    await this._threadRepository.verifyAvailableThread(useCasePayload.threadId);
    await this._commentRepository.verifyAvailableComment(useCasePayload.commentId);
    const postReply = new PostReply(useCasePayload);
    return this._replyRepository.addReply(postReply);
  }
}

module.exports = AddReplyUseCase;
