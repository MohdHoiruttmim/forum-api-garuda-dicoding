const AddThreadUseCase = require('../../../../Applications/use_case/AddThreadUseCase');

class ThreadsHandler {
  constructor(container) {
    this._container = container;

    this.postThreadHandler = this.postThreadHandler.bind(this);
    this.postThreadCommentHandler = this.postThreadCommentHandler.bind(this);
  }

  async postThreadHandler(request, h) {
    const { id: userId } = request.auth.credentials;
    const addThreadUseCase = this._container.getInstance(AddThreadUseCase.name);
    request.payload.owner = userId;
    const addedThread = await addThreadUseCase.execute(request.payload);

    const response = h.response({
      status: 'success',
      data: {
        addedThread,
      },
    });
    response.code(201);
    return response;
  }

  async postThreadCommentHandler(request, h) {
    const { id: userId } = request.auth.credentials;
    const { threadId } = request.params;
    const { content } = request.payload;

    const addThreadCommentUseCase = 'coming soon!';
    request.payload.owner = userId;
    const addedComment = addThreadCommentUseCase;

    const response = h.response({
      status: 'success',
      data: {
        addedComment: {
          content,
        },
        userId,
        threadId,
      },
    });
    response.code(201);
    return response;
  }
}

module.exports = ThreadsHandler;
