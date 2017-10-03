function getChatMessages(db){
  return db.all('SELECT * FROM ChatMessages');
}
function insertChatMessage(db, content){
  return db.run('INSERT INTO ChatMessages (content) VALUES (?)', content);
}

module.exports = {
  getChatMessages,
  insertChatMessage,
};
