const AddedReply = require('../AddedReply');

describe('a AddedReply entities', () => {
  it('should throw error when payload not contain needed property', () => {
    // Arrange
    const payload = {
      id: 'replies-123',
      content: 'ini adalah content',
    };

    // Action and Assert
    expect(() => new AddedReply(payload)).toThrowError('ADDED_REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 'replies-123',
      content: 'ini adalah content pertama',
      commentId: 123,
      owner: [],
    };

    // Action and Assert
    expect(() => new AddedReply(payload)).toThrowError('ADDED_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create AddedReply object correctly', () => {
    // Arrange
    const payload = {
      id: 'replies-123',
      content: 'ini adalah reply pertama',
      commentId: 'comment-123',
      owner: 'owner-123',
    };

    // Action
    const addedReply = new AddedReply(payload);

    // Assert
    expect(addedReply.id).toEqual(payload.id);
    expect(addedReply.content).toEqual(payload.content);
    expect(addedReply.commentId).toEqual(payload.commentId);
    expect(addedReply.owner).toEqual(payload.owner);
  });
});
