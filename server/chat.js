const {
  REFRESH_MESSAGES,
  REPORT_MESSAGE_DELIVERY,
} = require('../socket-messages');
const queries = require('./database/chat-message');

async function getChatMessages() {
  const rows = await queries.getChatMessages();
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
  const result = await queries.insertChatMessage({
    content
  });
  const id = result._id;
  return {
    id,
    content,
  };
}

function reportDelivery(ws, message) {
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
