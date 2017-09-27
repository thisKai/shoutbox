const {
  REFRESH_MESSAGES,
  SEND_MESSAGE,
} = require('./socket-messages');
const database = require('./database');

async function getChatMessages(){
  const db = await database();
  const rows = await db.all('SELECT * FROM ChatMessages');

  return rows.map(r => r.message_text);
}
console.log(getChatMessages());

async function refreshChat(ws) {
  ws.send(JSON.stringify({
    type: REFRESH_MESSAGES,
    messages: await getChatMessages(),
  }));
}

function refreshAllChats(wss) {
  return Promise.all([...wss.clients].map(refreshChat));
}

async function logChatMessage(message) {
  const db = await database();
  db.run('INSERT INTO ChatMessages (message_text) VALUES (?)', message);
}

function processSocketMessage(wss, client, msg) {
  const socketMessage = JSON.parse(msg);
  console.log('message:', socketMessage);

  switch (socketMessage.type) {
    case REFRESH_MESSAGES:
      refreshChat(client);
      break;
    case SEND_MESSAGE:
      logChatMessage(socketMessage.messageText);
      refreshAllChats(wss, client);
      break;
  }
}

module.exports = {
  refreshChat,
  processSocketMessage,
};
