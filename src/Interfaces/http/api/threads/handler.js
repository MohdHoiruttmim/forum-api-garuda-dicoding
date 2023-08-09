const AddCommentUseCase = require('../../../../Applications/use_case/AddCommentUseCase');
const AddThreadUseCase = require('../../../../Applications/use_case/AddThreadUseCase');
const GetThreadByIdUseCase = require('../../../../Applications/use_case/GetThreadByIdUseCase');

class ThreadsHandler {
  constructor(container) {
    this._container = container;

    this.postThreadHandler = this.postThreadHandler.bind(this);
    this.postThreadCommentHandler = this.postThreadCommentHandler.bind(this);
    this.getThreadByIdHandler = this.getThreadByIdHandler.bind(this);
  }

  async getThreadByIdHandler(request, h) {
    const { threadId } = request.params;
    const getThreadByIdUseCase = this._container.getInstance(GetThreadByIdUseCase.name);

    const thread = await getThreadByIdUseCase.execute(threadId);

    return {
      status: 'success',
      data: {
        thread,
      },
    };
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

    const addThreadCommentUseCase = this._container.getInstance(AddCommentUseCase.name);
    request.payload.owner = userId;
    request.payload.threadId = threadId;
    const addedComment = await addThreadCommentUseCase.execute(request.payload);

    const response = h.response({
      status: 'success',
      data: {
        addedComment,
      },
    });
    response.code(201);
    return response;
  }
}

module.exports = ThreadsHandler;
