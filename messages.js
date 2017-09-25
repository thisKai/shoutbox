const {
  REFRESH_MESSAGES,
  SEND_MESSAGE,
} = require('./socket-messages');

const messages = [];
function getChatMessages(){
  return Promise.resolve(messages);
}
console.log(messages);

async function refreshChat(ws) {
  ws.send(JSON.stringify({
    type: REFRESH_MESSAGES,
    messages: await getChatMessages(),
  }));
}

function refreshAllChats(wss) {
  return Promise.all([...wss.clients].map(refreshChat));
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
      logChatMessage(socketMessage.message);
      refreshAllChats(wss, client);
      break;
  }
}

module.exports = {
  refreshChat,
  processSocketMessage,
};
