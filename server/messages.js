const {
  REFRESH_MESSAGES,
  SEND_MESSAGE,
} = require('../socket-messages');
const {
  logChatMessage,
  reportDelivery,
  refreshChat,
  refreshAllChats,
} = require('./chat');

async function processSocketMessage(wss, client, msg) {
  const socketMessage = JSON.parse(msg);
  console.log('message:', socketMessage);

  switch (socketMessage.type) {
    case REFRESH_MESSAGES:
      refreshChat(client);
      break;
    case SEND_MESSAGE:
      const chatMessage = await logChatMessage(socketMessage.content);
      reportDelivery(client, chatMessage);
      refreshAllChats(wss, client);
      break;
  }
}

module.exports = {
  processSocketMessage,
};
