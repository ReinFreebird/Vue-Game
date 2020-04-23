/* eslint-disable func-names */
/* eslint-disable no-return-await */
/* eslint-disable no-useless-escape */
/**
 * @file User Schema
 * @copyright Phire Studio, 2019
 * @version 1.0.0
 * @module models/User
 */

// Dependencies
const mongoose = require('mongoose');

const RockSchema = new mongoose.Schema({
  createdBy: {
    type: String,
    required: [true, 'Name required.'],
  },
  content: {
    type: String,
    required: [true, 'Content required.'],
    ],
  },
  tags: [
  {
    type: String,
    default: 'unspecified',
  }
  ],
  createdAt:{
    type: Date,
    default: Date.now
  }
  
}
);



module.exports = mongoose.model('Rock',RockSchema);
