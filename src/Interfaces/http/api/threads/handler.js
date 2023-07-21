class ThreadsHandler {
  constructor() {

  }

  async postThreadHandler(request, h) {
    const { credentials } = request.auth;

    console.log(credentials);
    return credentials.id;
  }
}

module.exports = ThreadsHandler;
