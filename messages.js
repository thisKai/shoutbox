const {
    REFRESH_MESSAGES,
  } = require('./socket-messages');

const messages = [];

function refreshMessages(ws){
    ws.send(JSON.stringify({
        type: REFRESH_MESSAGES,
        messages,
    }));
}

module.exports = {
    refreshMessages,
};