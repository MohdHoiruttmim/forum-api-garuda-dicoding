const ReplyRepository = require('../../Domains/threads/comments/replies/RepliesRepository');

class ReplyRepositoryPostgres extends ReplyRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addReply(postReply) {
    const { content, commentId, owner } = postReply;
    const id = `reply-${this._idGenerator()}`;

    const query = {
      text: 'INSERT INTO replies VALUES ($1, $2, $3, $4, $5) RETURNING id, content, owner',
      values: [id, content, commentId, owner, new Date()],
    };

    const result = await this._pool.query(query);
    return { ...result.rows[0] };
  }
}

module.exports = ReplyRepositoryPostgres;
