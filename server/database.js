const sqlite = require('sqlite');

let database;

async function initialData(db) {
  try{
    await db.run('INSERT INTO ChatRooms DEFAULT VALUES');
  }catch(e){
    console.log('initialData', e)
  }
}

async function open() {
  console.log('opening database');
  const db = await sqlite.open('./.data/db.sqlite');
  if (process.env.SHOUTBOX_RESET_DB === '1') {
    await db.migrate({force: 'last'});
    await initialData(db);
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
