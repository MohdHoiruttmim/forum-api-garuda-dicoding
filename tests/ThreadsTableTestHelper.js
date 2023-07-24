/* instanbul ingore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const ThreadsTableTestHelper = {
  async addThreads(
    {
      id = 'threads-123',
      title = 'Lorem ip!',
      body = 'Lorem ipsum dolor sir amet amet',
      owner = 'user-123',
    },
  ) {
    const query = {
      text: 'INSERT INTO threads VALUES($1, $2, $3, $4)',
      values: [id, title, body, owner],
    };

    await pool.query(query);
  },

  async getThreadsById(id) {
    const query = {
      text: 'SELECT * FROM threads WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM threads WHERE 1=1');
  },
};

module.exports = ThreadsTableTestHelper;
