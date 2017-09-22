const {
    REFRESH_MESSAGES,
    SEND_MESSAGE,
  } = require('./socket-messages');

const messages = [];
console.log(messages);

function refreshMessages(ws){
    ws.send(JSON.stringify({
        type: REFRESH_MESSAGES,
        messages,
    }));
}

function processMessage(ws, msg){
    const message = JSON.parse(msg);
    console.log('message:', message);

    switch(message.type){
        case REFRESH_MESSAGES:
            refreshMessages(ws);
            break;
        case SEND_MESSAGE:
            messages.push(message.message);
            refreshMessages(ws);
            break;
    }

    console.log(messages);
}

module.exports = {
    refreshMessages,
    processMessage,
};