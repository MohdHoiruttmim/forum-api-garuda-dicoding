class PostComment {
  constructor(payload) {
    this._verifyPayload(payload);

    const { content, threadId } = payload;

    this.content = content;
    this.threadId = threadId;
  }

  _verifyPayload({ content, threadId }) {
    if (!content || !threadId) {
      throw new Error('POST_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof content !== 'string' || !threadId) {
      throw new Error('POST_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = PostComment;
