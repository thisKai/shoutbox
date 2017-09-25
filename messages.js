const {
  REFRESH_MESSAGES,
  SEND_MESSAGE,
} = require('./socket-messages');

const messages = [];
console.log(messages);

function refreshChat(ws) {
  ws.send(JSON.stringify({
    type: REFRESH_MESSAGES,
    messages,
  }));
}

function refreshAllChats(wss) {
  for (const client of wss.clients) {
    refreshChat(client);
  }
}

function logChatMessage(message) {
  messages.push(message);
}

function processSocketMessage(wss, client, msg) {
  const socketMessage = JSON.parse(msg);
  console.log('message:', socketMessage);

  switch (socketMessage.type) {
    case REFRESH_MESSAGES:
      refreshChat(client);
      break;
    case SEND_MESSAGE:
      logChatMessage(socketMessage);
      refreshAllChats(wss, client);
      break;
  }

  console.log(messages);
}

module.exports = {
  refreshChat,
  processSocketMessage,
};
