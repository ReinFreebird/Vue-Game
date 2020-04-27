/**
 * @file Production Queue Schema
 * @copyright Phire Studio, 2020
 * @version 1.0.0
 * @module models/manufacturing/ProductionQueue
 */

 const { Schema, model, createConnection } = require('mongoose');

const ProductionMachineSchema= Schema({
  station:{
    type: String,
    required: [true, 'Station']
  },
  ip:{
    type:String,
  },
  status:{
    type: String,
  },
  port:{
    type: Number,
  },
  protocol:{
    type:String,
  }
});
 const ProductionQueueSchema = Schema({
  name: {
    type: String,
    required: [true, 'Please add name']
  },
  machine: {
    type:[ProductionMachineSchema]
  }
  ,
  onModel: {
    type: String,
    enum: ['PLC', 'RFID', 'Sensor', 'Machine'],
    required: [true, 'please add machine type']
  },
  action: {
    type: String,
    enum: ['READ', 'WRITE'],
    required: [true, 'please add action']
  },
  address: {
    type: String
  },
  value: {
    type: String
  },
  createdAt:{
    type: Date,
    default: Date.now
  }
});
const connection = createConnection('mongodb://127.0.0.1:27017/phibase2',{ useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false});
 module.exports = connection.model('ProductionQueue', ProductionQueueSchema);