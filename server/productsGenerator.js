const fs = require('fs');
const faker = require('faker');

let enData = {
  products: []
};
let ruData = {
  products: []
};

const generateLocalFields = (locale) => {
  faker.locale = locale;
  return { name: faker.commerce.product(), description: faker.commerce.productName() }
}

for (let i = 0; i < 250; i++) {
  const commonFields = {
    id: i + 1,
    image: 'http://placehold.it/150/dff9f6',
    price: faker.commerce.price(),
    quantity: faker.random.number(100)
  };

  const enFields = generateLocalFields('en');
  const ruFields = generateLocalFields('ru');

  enData.products.push(Object.assign({}, commonFields, enFields));
  ruData.products.push(Object.assign({}, commonFields, ruFields));
}

const jsonEnData = JSON.stringify(enData);
const jsonRuData = JSON.stringify(ruData);

fs.writeFile('./server/mock.products.en.json', jsonEnData, 'utf8');
fs.writeFile('./server/mock.products.ru.json', jsonRuData, 'utf8');
