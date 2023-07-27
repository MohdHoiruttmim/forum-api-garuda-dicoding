const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const AddedThread = require('../../../Domains/threads/entities/AddedThread');
const PostThread = require('../../../Domains/threads/entities/PostThread');
const AddThreadUseCase = require('../AddThreadUseCase');

describe('AddThreadUseCase', () => {
  it('should orchestrating the add thread action correctly', async () => {
    // Arrange
    const useCasePayload = {
      title: 'Lorem ipsum!',
      body: 'Lorem ipsum dolor sir amet amet',
      owner: 'user-123',
    };

    const mockAddThread = new AddedThread({
      id: 'thread-123',
      title: 'Lorem ipsum!',
      owner: 'user-123',
    });

    /** creating depedency of use case * */
    const mockThreadRepository = new ThreadRepository();

    /** mocking needed function * */
    mockThreadRepository.addThread = jest.fn()
      .mockImplementation(() => Promise.resolve(mockAddThread));

    /** create use case instance * */
    const getThreadUseCase = new AddThreadUseCase({
      threadRepository: mockThreadRepository,
    });

    // Action
    const addedThread = await getThreadUseCase.execute(useCasePayload);

    // Assert
    expect(addedThread).toStrictEqual(new AddedThread({
      id: 'thread-123',
      title: useCasePayload.title,
      owner: useCasePayload.owner,
    }));

    expect(mockThreadRepository.addThread).toBeCalledWith(new PostThread({
      title: 'Lorem ipsum!',
      body: 'Lorem ipsum dolor sir amet amet',
      owner: 'user-123',
    }));
  });
});
