require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
const { PORT = 80 } = process.env;

app.use((req, res, next) => {
  console.log('Hello HTTP');
  next();
});

app.use(express.static(path.join(__dirname, 'static')));

app.ws('/', ws => {
  ws.on('message', msg => {
    console.log('message:', msg);
  });
  console.log('Hello WebSocket');
});

console.log('starting server at port', PORT);
app.listen(PORT);