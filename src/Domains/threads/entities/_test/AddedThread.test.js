const AddedThread = require('../AddedThread');

describe('a AddedThread entities', () => {
  it('should throw error when payload not contain nedded property', () => {
    // Arrange
    const payload = {
      id: 'thread-123',
      title: 'Lorem ipsum!',
    };

    // Action and Assert
    expect(() => new AddedThread(payload)).toThrowError('ADDED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('dhould throw error when payload did not meet data type specifications', () => {
    // Arrange
    const payload = {
      id: 123,
      title: 'Lorem ipsum',
      owner: {},
    };

    // Action and Assert
    expect(() => new AddedThread(payload)).toThrowError('ADDED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create AddedThread object correctly', () => {
    // Arrange
    const payload = {
      id: 'thread-789',
      title: 'Lorem Ipsum!',
      owner: 'user-123',
    };

    // Action
    const addedThread = new AddedThread(payload);

    // Assert
    expect(addedThread.id).toEqual(payload.id);
    expect(addedThread.title).toEqual(payload.title);
    expect(addedThread.owner).toEqual(payload.owner);
  });
});
