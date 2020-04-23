/**
 * @file MongoDB configuration
 * @copyright Phire Studio, 2019
 * @version 1.0.0
 * @module config/db
 */

// Dependencies
const mongoose = require('mongoose');

// Connect to DB
const connectMongo = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });

  console.log(
    `MongoDB Connected: ${conn.connection.host}`.blue.bgWhite,
  );
};

// Close to DB
const closeMongo = () => {
  return mongoose.disconnect();
};

module.exports = { connectMongo, closeMongo };
