const pool = require('../../database/postgres/pool');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const AuthenticationsTableTestHelper = require('../../../../tests/AuthenticationsTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const RepliesTableTestHelper = require('../../../../tests/RepliesTableTestHelper');
const container = require('../../container');
const createServer = require('../createServer');

describe('/authentications endpoint', () => {
  afterAll(async () => {
    await pool.end();
  });

  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
    await AuthenticationsTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await RepliesTableTestHelper.cleanTable();
  });

  describe('when POST /threads/{threadId}/replies', () => {
    it('should response 201 and persisted reply', async () => {
      // Arrange
      const requestPayload = {
        title: 'sebuah thread',
        body: 'sebuah thread body',
      };
      const server = await createServer(container);
      // add user
      await server.inject({
        method: 'POST',
        url: '/users',
        payload: {
          username: 'dicoding',
          password: 'secret',
          fullname: 'Dicoding Indonesia',
        },
      });

      // Login
      const responseAuthentication = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: {
          username: 'dicoding',
          password: 'secret',
        },
      });

      const responseAuthenticationJson = JSON.parse(responseAuthentication.payload);
      const { accessToken } = responseAuthenticationJson.data;

      const responseThread = await server.inject({
        method: 'POST',
        url: '/threads',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        payload: requestPayload,
      });

      const responseThreadJson = JSON.parse(responseThread.payload);
      const { id } = responseThreadJson.data.addedThread;

      const responseComment = await server.inject({
        method: 'POST',
        url: `/threads/${id}/comments`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        payload: {
          content: 'Ngoding asik, Bro',
        },
      });

      const responseCommentJson = JSON.parse(responseComment.payload);
      const { id: commentId } = responseCommentJson.data.addedComment;

      // Action
      const responseReplies = await server.inject({
        method: 'POST',
        url: `/threads/${id}/comments/${commentId}/replies`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        payload: {
          content: 'Ngoding asik, Bro',
        },
      });

      // Assert
      const responseJson = JSON.parse(responseReplies.payload);
      console.log(responseJson);
      expect(responseReplies.statusCode).toEqual(201);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.addedReply.id).toBeDefined();
      expect(responseJson.data.addedReply.content).toBeDefined();
      expect(responseJson.data.addedReply.owner).toBeDefined();
    });
  });
});
