const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const AddedThread = require('../../../Domains/threads/entities/AddedThread');
const GetThreadByIdUseCase = require('../GetThreadByIdUseCase');

/*
   KITA BELUM MEMBUAT GetThreadDetail ENTITIAS UNTUK MENGGANTIKAN CLASS
    AddedThread PADA BARIS 23 DAN 35
*/

describe('GetThreadByIdUseCase', () => {
  it('should orchestrating get thread by id action correctly', async () => {
    // Arrange
    const useCasePayload = {
      id: 'thread-123',
      title: 'Lorem ipsum!',
      owner: 'user-123',
    };
    const userPayload = {
      id: 'user-123',
    };

    const mockThreadRepository = new ThreadRepository();

    // Mocking
    mockThreadRepository.getThreadById = jest.fn()
      .mockImplementation(() => Promise.resolve(new AddedThread(useCasePayload)));

    // Create use case instance
    const getThreadById = new GetThreadByIdUseCase({
      threadRepository: mockThreadRepository,
    });

    // Action
    const threadDetail = await getThreadById.execute(useCasePayload.id);

    // Assert
    expect(mockThreadRepository.getThreadById).toBeCalledWith(useCasePayload.id);
    expect(threadDetail).toStrictEqual(new AddedThread({
      id: 'thread-123',
      title: 'Lorem ipsum!',
      owner: 'user-123',
    }));
  });
});
