const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);

app.get('/', (req, res) => {
  console.log('Hello HTTP');
  res.end();
});
app.ws('/', ws => {
  ws.on('message', msg => {
    console.log(msg);
  });
  console.log('Hello WebSocket');
});

app.listen(3000);
