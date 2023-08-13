const AuthorizationError = require('../../Commons/exceptions/AuthorizationError');
const CommentsRepository = require('../../Domains/threads/comments/CommentsRepository');

class ThreadCommentRepositoryPostgres extends CommentsRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addComment(postComment) {
    const { content, threadId, owner } = postComment;
    const id = `comment-${this._idGenerator()}`;

    const query = {
      text: 'INSERT INTO comments VALUES($1, $2, $3, $4, $5) RETURNING id, content, owner',
      values: [id, content, threadId, owner, new Date()],
    };

    const result = await this._pool.query(query);

    return { ...result.rows[0] };
  }

  async verifyCommentOwner(commentId, userId) {
    const query = {
      text: 'SELECT id FROM comments WHERE id = $1 AND owner = $2',
      values: [commentId, userId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new AuthorizationError('Anda tidak memiliki hak ke resource ini');
    }

    return result.rowCount;
  }
}

module.exports = ThreadCommentRepositoryPostgres;
