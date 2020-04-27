/**
 * @file Invoice Schema
 * @copyright Phire Studio, 2020
 * @version 1.0.0
 * @module models/Invoice 
 */

const mongoose = require('mongoose');
const AuotIncrement = require('mongoose-sequence')(mongoose);
const { pad, getFullDate } = require('../utils/conversion')

const PaymentSchema = mongoose.Schema({
  bankAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BankAccount',
    required: [true, 'Please add bank account number']
  },
  amount: {
    type: Number,
    required: [true, 'Please add amount']
  },
  paidAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['PENDING', 'APPROVED', 'REJECTED'],
    default: 'PENDING'
  },
  authorizedAt: {
    type: Date,
    default: null
  },
  authorizedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  notes: {
    type: String
  }
 });

const InvoiceSchema = mongoose.Schema({
  deliveryOrder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DeliveryOrder'
  },
  customer: {
    type: String,
    required: [ true, 'Please add customer code']
  },
  invoiceNumber: {
    type: Number,
    default: 0
  },
  tax: {
    type: Number,
    min: 0,
    max: 100,
    default: null
  },
  subtotal: {
    type: Number,
    default: 0
  },
  grandtotal: {
    type: Number,
    default: 0
  },
  amountReceived: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['NEW_INVOICE_CREATED', 'INVOICE_PAID_PROGRESSING', 'INVOICE_PAID_FULL' ],
    default: 'NEW_INVOICE_CREATED'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  payments: [PaymentSchema]
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

InvoiceSchema.plugin(AuotIncrement, {inc_field: 'invoiceNumber'});

InvoiceSchema.virtual('invoiceNumberLong').get(function() {
  const dates = getFullDate(this.createdAt);
  const invoiceNumber = pad(this.invoiceNumber);
  return `INV/${dates}/${this.customer}/${invoiceNumber}`;
});

module.exports = mongoose.model('Invoice', InvoiceSchema);