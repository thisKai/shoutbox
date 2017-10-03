const initDatabase = require('../../database');
const ChatMessage = require('../../database/chat-message');

async function getChatMessages(){
  await initDatabase();
  return ChatMessage.find({}, { sort: 'timestamp' });
}
async function insertChatMessage(content){
  await initDatabase();
  return ChatMessage.create({
    content,
    timestamp: new Date(),
  }).save();
}

module.exports = {
  getChatMessages,
  insertChatMessage,
};
