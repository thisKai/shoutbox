const {
  REFRESH_MESSAGES,
  REPORT_MESSAGE_DELIVERY,
} = require('../socket-messages');
const database = require('./database');
const queries = require('./queries/chat');

async function getChatMessages(){
  const db = await database();
  const rows = await queries.getChatMessages(db);
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
  const result = await queries.insertChatMessage(db);
  const id = result.stmt.lastID
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
