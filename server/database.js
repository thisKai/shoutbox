const sqlite = require('sqlite');

let database;

async function open() {
  console.log('opening database');
  const db = await sqlite.open('./.data/db.sqlite');
  if (process.env.SHOUTBOX_RESET_DB === '1') {
    await db.migrate({force: 'last'});
  }
  return db;
}
function get() {
  if (!database) {
    database = open();
  }
  return database;
}

module.exports = get;
