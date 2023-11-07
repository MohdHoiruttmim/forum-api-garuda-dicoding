const PostReply = require('../PostReply');

describe('a PostReply entities', () => {
  it('should return error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      content: 'Ini adalah reply pertama',
    };

    // Action and Assert
    expect(() => new PostReply(payload)).toThrowError('POST_REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should return error when payload did not meet data type specific', () => {
    // Arrange
    const payload = {
      content: 'Ini adalah reply pertama',
      owner: 123,
      commentId: 'comment-123',
    };

    // Action and Assert
    expect(() => new PostReply(payload)).toThrowError('POST_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create postReply object correctly', () => {
    // Arrange
    const payload = {
      content: 'Ini adalah reply pertama',
      owner: 'user-123',
      commentId: 'comment-123',
    };

    // Action
    const { content, owner, commentId } = new PostReply(payload);

    // Action and Assert
    expect(content).toEqual(payload.content);
    expect(owner).toEqual(payload.owner);
    expect(commentId).toEqual(payload.commentId);
  });
});
