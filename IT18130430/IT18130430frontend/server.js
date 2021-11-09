const express = require('express');
const path = require('path');
const app = express()

app.listen(process.env.PORT || 3000);

// set static folder
app.use(express.static(__dirname + '/build/'));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/build/index.html'));
});

app.get('/health-check', (req, res) => {
  return res.send('online');
});