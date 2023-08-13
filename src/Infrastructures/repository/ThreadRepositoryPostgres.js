const ThreadRepository = require('../../Domains/threads/ThreadRepository');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');

class ThreadRepositoryPostgres extends ThreadRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async verifyAvailableThread(threadId) {
    const query = {
      text: 'SELECT id FROM threads WHERE id = $1',
      values: [threadId],
    };

    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotFoundError('Thread tidak ditemukan');
    }

    return result.rowCount;
  }

  async addThread(postThread) {
    const { title, body, owner } = postThread;
    const id = `thread-${this._idGenerator()}`;

    const query = {
      text: 'INSERT INTO threads VALUES($1, $2, $3, $4, $5) RETURNING id, title, owner',
      values: [id, title, body, new Date(), owner],
    };

    const result = await this._pool.query(query);

    return { ...result.rows[0] };
  }

  async getThreadById(threadId) {
    const query = {
      text: `SELECT threads.id, title, body, date, username FROM threads 
             INNER JOIN users ON users.id = threads.owner
             WHERE threads.id = $1`,
      values: [threadId],
    };

    const result = await this._pool.query(query);

    const threadCommentsQuery = {
      text: `SELECT comments.id, content, username, date FROM comments
             INNER JOIN users ON users.id = comments.owner
             WHERE thread_id = $1 ORDER BY date ASC`,
      values: [threadId],
    };

    const { rows: comments } = await this._pool.query(threadCommentsQuery);
    result.rows[0].comments = comments;
    return { ...result.rows[0] };
  }
}

module.exports = ThreadRepositoryPostgres;
