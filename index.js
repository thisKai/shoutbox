require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
const { PORT = 80 } = process.env;
const {
  REFRESH_MESSAGES,
} = require('./socket-messages');

app.use((req, res, next) => {
  console.log('Hello HTTP');
  next();
});

app.use(express.static(path.join(__dirname, 'static')));
app.use(express.static(path.join(__dirname, 'dist')));

const messages = [];

app.ws('/', ws => {
  ws.on('message', msg => {
    console.log('message:', msg);
  });
  console.log('Hello WebSocket');
  ws.send(JSON.stringify({
    type: REFRESH_MESSAGES,
    messages,
  }));
});

console.log('starting server at port', PORT);
app.listen(PORT);
