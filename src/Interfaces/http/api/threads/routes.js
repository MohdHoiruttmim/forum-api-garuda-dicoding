const routes = (handler) => [
  {
    method: 'GET',
    path: '/threads/{threadId}',
    handler: handler.getThreadByIdHandler,
    options: {
      auth: 'forum_auth',
    },
  },
  {
    method: 'POST',
    path: '/threads',
    handler: handler.postThreadHandler,
    options: {
      auth: 'forum_auth',
    },
  },
  {
    method: 'POST',
    path: '/threads/{threadId}/comments',
    handler: handler.postThreadCommentHandler,
    options: {
      auth: 'forum_auth',
    },
  },
];

module.exports = routes;
