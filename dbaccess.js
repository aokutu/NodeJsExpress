const fs = require('fs');
const path = require('path');
const initSqlJs = require('sql.js');
require('dotenv').config();

const cleanDbPath = (process.env.DB_PATH || 'app.db').trim();
const dbPath = path.resolve(__dirname, cleanDbPath);
fs.mkdirSync(path.dirname(dbPath), { recursive: true });

let sqlDb = null;
let readyPromise = null;

async function init() {
  if (sqlDb) return sqlDb;
  if (!readyPromise) {
    readyPromise = (async () => {
      const SQL = await initSqlJs();
      if (fs.existsSync(dbPath)) {
        const fileBuffer = fs.readFileSync(dbPath);
        sqlDb = new SQL.Database(fileBuffer);
      } else {
        sqlDb = new SQL.Database();
      }
      return sqlDb;
    })();
  }
  return readyPromise;
}

function saveToDisk() {
  if (!sqlDb) return;
  const data = sqlDb.export();
  fs.writeFileSync(dbPath, Buffer.from(data));
}

function exec(sql) {
  if (!sqlDb) {
    throw new Error('Database not initialized yet. Await db.ready first.');
  }
  sqlDb.run(sql);
  saveToDisk();
}

function pragma(pragmaStr) {
  // sql.js runs in memory/WASM; WAL mode isn't needed like on file-locked SQLite
  if (!sqlDb) return null;
  return sqlDb.exec(`PRAGMA ${pragmaStr}`);
}

function prepare(sql) {
  if (!sqlDb) {
    throw new Error('Database not initialized yet. Await db.ready first.');
  }
  return {
    get(...params) {
      const stmt = sqlDb.prepare(sql);
      try {
        if (params.length) stmt.bind(params);
        if (!stmt.step()) return undefined;
        return stmt.getAsObject();
      } finally {
        stmt.free();
      }
    },
    all(...params) {
      const stmt = sqlDb.prepare(sql);
      const rows = [];
      try {
        if (params.length) stmt.bind(params);
        while (stmt.step()) {
          rows.push(stmt.getAsObject());
        }
        return rows;
      } finally {
        stmt.free();
      }
    },
    run(...params) {
      const stmt = sqlDb.prepare(sql);
      try {
        if (params.length) stmt.bind(params);
        stmt.step();
        saveToDisk();
        return {
          changes: sqlDb.getRowsModified(),
        };
      } finally {
        stmt.free();
      }
    },
  };
}

const ready = init();

module.exports = {
  ready,
  prepare,
  exec,
  pragma,
  save: saveToDisk,
  get raw() {
    return sqlDb;
  },
};