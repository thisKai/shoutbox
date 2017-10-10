const {
  Document
} = require('camo');
const initDatabase = require('.');

class ChatMessage extends Document {
  constructor() {
    super();

    this.content = String;
    this.timestamp = Date;
  }
}

async function getChatMessages(){
  await initDatabase();
  return ChatMessage.find({}, {
    sort: 'timestamp'
  });
}

async function insertChatMessage({
  content
}) {
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
