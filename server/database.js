const sqlite = require('sqlite');
const { initializeChatRoom } = require('./chat-room');

async function initialData(db) {
  try{
    await initializeChatRoom(db);
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

let database;
function get() {
  if (!database) {
    database = open();
  }
  return database;
}

module.exports = get;
