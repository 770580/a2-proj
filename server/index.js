const express = require('express');
const app = express();

app.get('/api/test', function (req, res) {
  res.send('API server works!');
})

app.listen(3000, function () {
  console.log('Server listening on port 3000!');
})