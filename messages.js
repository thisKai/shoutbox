const {
  REFRESH_MESSAGES,
  SEND_MESSAGE,
} = require('./socket-messages');
const database = require('./database');

async function getChatMessages(){
  const db = await database();
  const rows = await db.all('SELECT * FROM ChatMessages');
  return rows.map(r => r.content);
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

}

function processSocketMessage(wss, client, msg) {
  const socketMessage = JSON.parse(msg);
  console.log('message:', socketMessage);

  switch (socketMessage.type) {
    case REFRESH_MESSAGES:
      refreshChat(client);
      break;
    case SEND_MESSAGE:
      logChatMessage(socketMessage.content);
      refreshAllChats(wss, client);
      break;
  }
}

module.exports = {
  refreshChat,
  processSocketMessage,
};
