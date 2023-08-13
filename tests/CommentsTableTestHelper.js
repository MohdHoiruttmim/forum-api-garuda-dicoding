/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const CommentsTableTestHelper = {
  async addThreadComment({
    id = 'comment-001',
    content = 'Lorem ipsum dolor sir amet suwun matur nuwun',
    threadId = 'thread-help01',
    date = new Date('2023-01-19T00:00:00.000Z'),
    owner = 'user-help01',
  }) {
    const query = {
      text: 'INSERT INTO comments VALUES($1, $2, $3, $4, $5)',
      values: [id, content, threadId, owner, date],
    };
    try {
      await pool.query(query);
    } catch (error) {
      console.log(error);
    }
  },

  async cleanTable() {
    await pool.query('DELETE FROM comments WHERE 1=1');
  },

  async getCommentById(commentId) {
    const query = {
      text: 'SELECT * FROM comments WHERE id = $1',
      values: [commentId],
    };

    const result = await pool.query(query);
    return result.rows;
  },
};

module.exports = CommentsTableTestHelper;
