const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const CommentsRepository = require('../../../Domains/threads/comments/CommentsRepository');
const AddedComment = require('../../../Domains/threads/comments/entities/AddedComment');
const PostComment = require('../../../Domains/threads/comments/entities/PostComment');
const AddCommentUseCase = require('../AddCommentUseCase');

describe('AddCommentUseCase', () => {
  it('should orchestarting the add comment action correctly', async () => {
    // Arrange
    const useCasePayload = {
      content: 'INi adalah komentar pertama',
      threadId: 'thread-123',
    };

    const mockAddedComment = new AddedComment({
      id: 'comment-123',
      content: 'INi adalah komentar pertama',
      owner: 'user-123',
    });

    /** creating depedency of use case * */
    const mockCommentRepository = new CommentsRepository();
    const mockThreadRepository = new ThreadRepository();

    /** mocking needed function * */
    mockCommentRepository.verifyAvailableThread = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockCommentRepository.addComment = jest.fn()
      .mockImplementation(() => Promise.resolve(mockAddedComment));
    mockThreadRepository.verifyAvailableThread = jest.fn()
      .mockImplementation(() => Promise.resolve());

    /** create use case instance * */
    const getCommentUseCase = new AddCommentUseCase({
      commentsRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });

    // Action
    const addedComment = await getCommentUseCase.execute(useCasePayload);

    // Assert
    expect(addedComment).toStrictEqual(new AddedComment({
      id: 'comment-123',
      content: useCasePayload.content,
      owner: 'user-123',
    }));

    expect(mockThreadRepository.verifyAvailableThread).toBeCalledWith(useCasePayload.threadId);
    expect(mockCommentRepository.addComment).toBeCalledWith(new PostComment({
      content: useCasePayload.content,
      threadId: useCasePayload.threadId,
    }));
  });
});
