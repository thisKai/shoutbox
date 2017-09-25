const {
  REFRESH_MESSAGES,
  SEND_MESSAGE,
} = require('./socket-messages');

const messages = [];
console.log(messages);

function refreshMessages(ws) {
  ws.send(JSON.stringify({
    type: REFRESH_MESSAGES,
    messages,
  }));
}

function refreshEveryonesMessages(wss) {
  for (const client of wss.clients) {
    refreshMessages(client);
  }
}

function processMessage(wss, client, msg) {
  const message = JSON.parse(msg);
  console.log('message:', message);

  switch (message.type) {
    case REFRESH_MESSAGES:
      refreshMessages(client);
      break;
    case SEND_MESSAGE:
      messages.push(message.message);
      refreshEveryonesMessages(wss, client);
      break;
  }

  console.log(messages);
}

module.exports = {
  refreshMessages,
  processMessage,
};
