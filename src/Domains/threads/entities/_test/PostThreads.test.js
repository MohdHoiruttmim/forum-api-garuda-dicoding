const PostThread = require('../PostThread');

describe('a PostThread entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      body: 'Lorem ipsum dolor sir amet',
    };

    // Action and Assert
    expect(() => new PostThread(payload)).toThrowError('POST_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type spesification', () => {
    // Arrange
    const payload = {
      title: true,
      body: 'Lorem ipsum dolor sir amet',
      owner: 'user-123',
    };

    // Action and Assert
    expect(() => new PostThread(payload)).toThrowError('POST_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should throw error when title contains more than 50 character', () => {
    // Arrange
    const payload = {
      title: 'dicodingindonesiadicodingindonesiadicodingindonesiadicoding',
      body: 'lorem ipsum dolor sir amet',
      owner: 'user-123',
    };

    // Action and Assert
    expect(() => new PostThread(payload)).toThrowError('POST_THREAD.TITLE_LIMIT_CHAR');
  });

  it('should create postThread object correctly', () => {
    // Arrange
    const payload = {
      title: 'Story Of UTM',
      body: 'Lorem ipsum dolor sir amet amet',
      owner: 'user-123',
    };

    // Action
    const { title, body, owner } = new PostThread(payload);

    // Assert
    expect(title).toEqual(payload.title);
    expect(body).toEqual(payload.body);
    expect(owner).toEqual(payload.owner);
  });
});
