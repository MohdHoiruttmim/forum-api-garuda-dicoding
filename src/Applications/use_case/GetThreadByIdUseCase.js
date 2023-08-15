class GetThreadByIdUseCase {
  constructor({ threadRepository }) {
    this._threadRepository = threadRepository;
  }

  async execute(threadId) {
    await this._threadRepository.verifyAvailableThread(threadId);
    const thread = await this._threadRepository.getThreadById(threadId);
    return thread;
  }
}

module.exports = GetThreadByIdUseCase;
