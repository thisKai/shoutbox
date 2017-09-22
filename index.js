require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
const { PORT = 80 } = process.env;
const { refreshMessages, processMessage } = require('./messages');

app.use((req, res, next) => {
  console.log('Hello HTTP');
  next();
});

app.use(express.static(path.join(__dirname, 'static')));
app.use(express.static(path.join(__dirname, 'dist')));

app.ws('/', ws => {
  ws.on('message', msg => {
    processMessage(ws, msg);
  });
  console.log('Hello WebSocket');
  refreshMessages(ws);
});

console.log('starting server at port', PORT);
app.listen(PORT);
