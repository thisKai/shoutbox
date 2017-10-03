const initDatabase = require('../../database');
const ChatMessage = require('../../database/chat-message');

async function getChatMessages(){
  await initDatabase();
  return ChatMessage.find({});
}
async function insertChatMessage(content){
  await initDatabase();
  return ChatMessage.create({ content }).save();
}

module.exports = {
  getChatMessages,
  insertChatMessage,
};
