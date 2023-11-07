const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const CommentsRepository = require('../../../Domains/threads/comments/CommentsRepository');
const ReplyRepository = require('../../../Domains/threads/comments/replies/RepliesRepository');
const AddedReply = require('../../../Domains/threads/comments/replies/entities/AddedReply');
const PostReply = require('../../../Domains/threads/comments/replies/entities/PostReply');
const AddReplyUseCase = require('../AddReplyUseCase');

describe('AddReplyUseCase', () => {
  it('should orechestarting the add reply action correctly', async () => {
    // Arrange
    const useCasePayload = {
      content: 'Ini adalah reply',
      commentId: 'comment-123',
      owner: 'user-123',
    };

    const mockAddedReply = new AddedReply({
      id: 'reply-123',
      content: 'Ini adalah reply',
      commentId: 'comment-123',
      owner: 'user-123',
    });

    /** creating depedency of use case * */
    const mockReplyRepository = new ReplyRepository();
    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentsRepository();

    /** mocking needed function * */
    mockThreadRepository.verifyAvailableThread = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockCommentRepository.verifyAvailableComment = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockReplyRepository.addReply = jest.fn()
      .mockImplementation(() => Promise.resolve(mockAddedReply));

    /** create use case instance * */
    const getReplyUseCase = new AddReplyUseCase({
      replyRepository: mockReplyRepository,
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });

    // Action
    const addedReply = await getReplyUseCase.execute(useCasePayload);

    // Assert
    expect(addedReply).toStrictEqual(new AddedReply({
      id: 'reply-123',
      content: useCasePayload.content,
      commentId: useCasePayload.commentId,
      owner: useCasePayload.owner,
    }));

    expect(mockThreadRepository.verifyAvailableThread).toBeCalledWith(useCasePayload.threadId);
    expect(mockCommentRepository.verifyAvailableComment).toBeCalledWith(useCasePayload.commentId);
    expect(mockReplyRepository.addReply).toBeCalledWith(new PostReply({
      content: useCasePayload.content,
      commentId: useCasePayload.commentId,
      owner: useCasePayload.owner,
    }));
  });
});
