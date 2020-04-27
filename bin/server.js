/* eslint-disable no-unused-vars */
/**
 * @file Server side Loader
 * @copyright Phire Studio, 2019
 * @version 1.0.0
 * @module Server
 */

/** Dependencies */
const colors = require('colors');
const dotenv = require('dotenv');
const db = require('../config/db');

/** import environmental variables from .env */
dotenv.config({ path: './config/.env.sample' });

console.log(__dirname);

/** Connect to MongoDB */
db.connectMongo();

/** Load all apps middleware */
const app = require('../app');

/** Set server port */
const PORT = process.env.PORT || 3000;

/** Start server after all above checked and pass */
const server = app.listen(
  PORT,
  console.log(
    `Server in ${process.env.NODE_ENV} mode → Running on PORT ${PORT}`
      .blue.bgWhite,
  ),
);

/** Handle unhandled promise rejections */
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);

  // Close server and exit gracefully
  server.close(() => process.exit(1));
});

module.exports = server;
