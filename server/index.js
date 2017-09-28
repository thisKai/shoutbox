require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
const {
  PORT = 80
} = process.env;
const {
  refreshChat,
  processSocketMessage,
} = require('./messages');

require('./webpack-dev-middleware')(app);


app.use((req, res, next) => {
  console.log('Hello HTTP');
  next();
});

app.use(express.static(path.resolve(__dirname, '..', 'static')));
app.use(express.static(path.resolve(__dirname, '..', 'dist')));

const wss = expressWs.getWss();

app.ws('/', ws => {
  ws.on('message', msg => {
    processSocketMessage(wss, ws, msg);
  });
  console.log('Hello WebSocket');
  refreshChat(ws);
});

console.log('starting server at port', PORT);
app.listen(PORT);
