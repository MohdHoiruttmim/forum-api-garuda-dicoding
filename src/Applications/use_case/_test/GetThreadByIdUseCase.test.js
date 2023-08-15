const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const GetThreadByIdUseCase = require('../GetThreadByIdUseCase');

describe('GetThreadByIdUseCase', () => {
  it('should orchestrating get thread by id action correctly', async () => {
    // Arrange
    const useCasePayload = {
      id: 'thread-123',
      title: 'Lorem ipsum!',
      owner: 'user-123',
    };

    const threadDetailResponse = {
      id: 'thread-123',
      title: 'Lorem ipsum!',
      body: 'Lorem ipsum dolor sir amet amet lorem ipsum!',
      date: new Date('2023-01-19T00:00:00.000Z'),
      username: 'user-001',
      comments: [
        {
          id: 'comments-123',
          username: 'johndoe',
          date: new Date('2023-01-19T00:00:00.000Z'),
          content: 'ini adalah sebuah komen!',
        },
      ],
    };

    const mockThreadRepository = new ThreadRepository();

    // Mocking
    mockThreadRepository.getThreadById = jest.fn()
      .mockImplementation(() => Promise.resolve(threadDetailResponse));
    mockThreadRepository.verifyAvailableThread = jest.fn()
      .mockImplementation(() => Promise.resolve());

    // Create use case instance
    const getThreadById = new GetThreadByIdUseCase({
      threadRepository: mockThreadRepository,
    });

    // Action
    const threadDetail = await getThreadById.execute(useCasePayload.id);

    // Assert
    expect(mockThreadRepository.verifyAvailableThread).toBeCalledWith(useCasePayload.id);
    expect(mockThreadRepository.getThreadById).toBeCalledWith(useCasePayload.id);
    expect(threadDetail).toStrictEqual(threadDetailResponse);
  });
});
