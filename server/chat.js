const {
  REFRESH_MESSAGES,
  REPORT_MESSAGE_DELIVERY,
} = require('../socket-messages');
const database = require('./database');

async function getChatMessages(){
  const db = await database();
  const rows = await db.all('SELECT * FROM ChatMessages');
  return rows;
}
console.log(getChatMessages());

async function refreshChat(ws) {
  ws.send(JSON.stringify({
    type: REFRESH_MESSAGES,
    messages: await getChatMessages(),
  }));
}

async function refreshAllChats(wss) {
  const chatMessages = await getChatMessages();
  return Promise.all([...wss.clients].map(client => {
    client.send(JSON.stringify({
      type: REFRESH_MESSAGES,
      messages: chatMessages,
    }));
  }));
}

async function logChatMessage(content) {
  const db = await database();
  await db.run('INSERT INTO ChatMessages (content) VALUES (?)', content);
  const result = await db.get('SELECT last_insert_rowid()');
  const id = result['last_insert_rowid()'];
  return {
    id,
    content,
  };
}

function reportDelivery(ws, message){
  ws.send(JSON.stringify({
    type: REPORT_MESSAGE_DELIVERY,
    message,
  }));
}

module.exports = {
  logChatMessage,
  reportDelivery,
  refreshChat,
  refreshAllChats,
};
