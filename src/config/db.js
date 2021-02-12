require('dotenv').config();
const { Pool, Client } = require('pg');

const pool = new Pool({
  connectionString: process.env.PGCONNECTIONSTRING,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;