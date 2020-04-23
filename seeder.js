/**
 * @file Application Seeder
 * @copyright Phire Studio, 2019
 * @version 1.0.0
 * @module seeder
 */

// Dependencies
const fs = require('fs');
const mongoose = require('mongoose');
// eslint-disable-next-line no-unused-vars
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/.env' });

// Load models
const Store = require('./models/Store');
const Product = require('./models/Product');
const User = require('./models/User');
const Customer = require('./models/Customer');
const Item = require('./models/Item');
const Quotation = require('./models/Quotation');
const SalesOrder = require('./models/SalesOrder');
const DeliveryOrder = require('./models/DeliveryOrder');

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// Read JSON files
const stores = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/stores.json`, 'utf-8'),
);

const products = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/products.json`, 'utf-8'),
);

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8'),
);

const customers = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/customers.json`, 'utf-8'),
);

const items = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/items.json`, 'utf-8'),
);

const quotations = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/quotations.json`, 'utf-8'),
);

const salesorders = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/salesorders.json`, 'utf-8'),
);

const deliveryorders = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/deliveryorders.json`, 'utf-8'),
);

// Import into DB
const importData = async () => {
  try {
    await Store.create(stores);
    await Product.create(products);
    await User.create(users);
    await Customer.create(customers);
    await Item.create(items);
    await Quotation.create(quotations);
    await SalesOrder.create(salesorders);
    await DeliveryOrder.create(deliveryorders);
    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Store.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    await Customer.deleteMany();
    await Item.deleteMany();
    await Quotation.deleteMany();
    await SalesOrder.deleteMany();
    await DeliveryOrder.deleteMany();
    console.log('Data Destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
