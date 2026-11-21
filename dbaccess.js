const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
require('dotenv').config();

const dbPath = path.resolve(__dirname, process.env.DB_PATH || 'app.db');

fs.mkdirSync(path.dirname(dbPath), { recursive: true });

const db = new Database(dbPath, {
  verbose: process.env.NODE_ENV !== 'production' ? console.log : null,
});

db.pragma('journal_mode = WAL');

module.exports = db;