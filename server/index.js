const express = require('express');
const app = express();

app.get('/api/test', function (req, res) {
  res.send('API server works!');
})

app.get('/api/products', function (req, res) {
  const lang = req.query.lang || 'en';
  const data = require('./mock.products.' + lang + '.json');
  if (req.query.idList) {
    data.products = data.products.filter(item => (req.query.idList.indexOf(item.id) > -1));
  }
  setTimeout(() => (res.send(data)), 1500);
})

app.listen(3000, function () {
  console.log('Server listening on port 3000!');
})
