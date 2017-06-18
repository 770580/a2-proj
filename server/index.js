const express = require('express');
const fs = require('fs');
const app = express();

app.get('/api/test', function (req, res) {
  res.send('API server works!');
})

app.get('/api/products', function (req, res) {
  const lang = req.query.lang || 'en';
  const fileName = `./server/mock.products.${lang}.json`;
  const data =  fs.readFileSync(fileName, 'utf8');
  setTimeout(() => (res.send(data)), 1500);
})

app.listen(3000, function () {
  console.log('Server listening on port 3000!');
})
