const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'primordial',
  password: 'attackanas17',
  port: 5432,
});

module.exports = pool;