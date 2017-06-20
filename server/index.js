const express = require('express');
const app = express();

app.get('/api/test', function (req, res) {
  res.send('API server works!');
});

app.get('/api/products', function (req, res) {
  const lang = req.query.lang || 'en';
  let data = require('./mock.products.' + lang + '.json');
  if (req.query.idList) {
    const filteredData = {};
    filteredData.products = data.products.filter(item => (req.query.idList.indexOf(item.id) > -1));
    data = filteredData;
  }
  if (req.query.hasOwnProperty('localize')) {
    data.products = data.products.map(item => {
      const { id, name, description} = item;
      return { id, name, description};
    })
  }

  setTimeout(() => (res.send(data)), 750);
});

app.listen(3000, function () {
  console.log('Server listening on port 3000!');
});
