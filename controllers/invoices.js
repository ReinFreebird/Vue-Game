/**
 * @file Invoice Controller
 * @copyright Phire Studio, 2020
 * @version 1.0.0
 * @module controller/invoices
 */

 const ErrorResponse = require('../utils/errorResponse');
 const asyncHandler = require('../handlers/asyncHandlers');
 const Invoice = require('../models/Invoice');
 const BankAccount = require('../models/BankAccount');
 const DeliveryOrder = require('../models/DeliveryOrder');

 /**
  * @desc   Get All Invoices
  * @route  GET /api/v1/invoices/
  * @access Private
  */
exports.getInvoices = asyncHandler(async (req, res) => {
  res.status(200).json(res.queryResults);
});

 /**
  * @desc   Get invoices by ID
  * @route  /api/v1/invoices/:id
  * @access Private
  */
exports.getInvoice = asyncHandler(async (req, res, next) => {
  const invoice = await Invoice.findById(req.params.id).populate({
    path: 'deliveryOrder',
    populate: {
      path: 'salesorder',
      populate: {
        path: 'quotation',
        populate: {
          path: 'customer'
        }
      }
    }, 
  });

  if (!invoice) {
    return next(
      new ErrorResponse(
        `Invoice with ID ${req.params.id} not exists`,
        404
      )
    );
  }

  res.status(200).json({
    success: true,
    data: invoice
  })
});

/**
 * @desc    Create New invoice
 * @route   POST /api/v1/invoices/
 * @access  Private
 */
exports.createInvoice = asyncHandler(async (req, res, next) => {

  const deliveryOrder = await DeliveryOrder.findById(req.params.id).populate({
    path: 'salesorder',
    populate: {
      path: 'quotation',
      populate: {
        path: 'customer'
      }
    }
  })

  if (!deliveryOrder) {
    return next(
      new ErrorResponse(
        `Order delivery with ID ${req.params.id} not exists`,
        404
      )
    );
  } else if (deliveryOrder.status != 'Delivery Done') {
    return next(
      new ErrorResponse(
        `Delivery order with ID ${req.params.id} is not done yet`,
        400
      )
    );
  }

  /**
   * @TODO calculate invoice amount based on item list in quotation
   */ 
  const data = {
    deliveryOrder: req.params.id,
    customer: deliveryOrder.salesorder.quotation.customer.customerID,
    subtotal: deliveryOrder.salesorder.quotation.subtotal[0].value,
    grandtotal: deliveryOrder.salesorder.quotation.subtotal[0].value
  };

  const invoice = await Invoice.create(data);
  const message = `Invoice for delivery order with number ${deliveryOrder.DOnumber} has been created`;
  
  res.status(200).json({
    success: true,
    message,
    data: {
      deliveryorder: res.deliveryorder,
      invoice
    }
  })
});

/**
 * @desc    Update invoice
 * @route   PUT /api/v1/invoices/:id
 * @access  Private
 */
exports.updateInvoice = asyncHandler(async (req, res, next) => {
  let invoice = await Invoice.findById(req.params.id);

  if (!invoice) {
    return next(
      new ErrorResponse(
        `Invoice with ID ${invoice._id} not exists`,
        404
      )
    );
  }

  invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: invoice
  });
});

/**
 * @desc    Delete invoice
 * @route   DELETE /api/v1/invoices/:id
 * @access  Private
 */
exports.deleteInvoice = asyncHandler(async (req, res, next) => {
  const invoice = await Invoice.findById(req.params.id);

  if (!invoice) {
    return next(
      new ErrorResponse(
        `Invoice with ID ${req.params.id} not exists`,
        404
      )
    );
  }

  await invoice.remove();

  res.status(200).json({
    success: true,
    data: {}
  })
})

/**
 * @desc    Add payment to invoice
 * @route   POST /api/v1/invoices/:id/payment
 * @access  Private
 */
exports.paymentEntry = asyncHandler(async (req, res, next) => {
  let invoice = await Invoice.findById(req.params.id);
  if (!invoice) {
    return next(
      new ErrorResponse(
        `Invoice with ID ${req.params.id} not exists`,
        404
      )
    );
  }

  if (invoice.status == 'INVOICE_PAID_FULL') {
    return next(
      new ErrorResponse(
        `Invoice with ID ${req.params.id} has been fully paid`,
        400
      )
    );
  }

  if (req.body.bankAccount) {
    console.log(req.body.bankAccount, typeof(req.body.bankAccount));
    const bankAccount = await BankAccount.findById(req.body.bankAccount);
    if (!bankAccount) {
      return next(
        new ErrorResponse(
          `Bank Account with ID ${req.body.bankAccount} not exists`,
          404
        )
      );
    }
    
    req.body.bankAccount = bankAccount._id;
    console.log(req.body.bankAccount, typeof(req.body.bankAccount));
  }

  invoice = await Invoice.findByIdAndUpdate(req.params.id, { $push: { payments: req.body} }, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: invoice
  });
});

/** 
 * @desc    Get list of pending payment
 * @route   GET /api/v1/invoices/:id/payment-pending
 * @access  Private
 */
exports.getPendingPayments = asyncHandler(async (req, res, next) => {
  const invoice = await Invoice.find({"payments.status": "PENDING"}).populate({ path: 'payments.bankAccount'});

  

  res.status(200).json({
    success: true,
    data: invoice

  });
});

/** 
 * @desc    Get list of pending payment
 * @route   GET /api/v1/invoices/:id/payment-pending
 * @access  Private
 */
exports.getPendingPayment = asyncHandler(async (req, res, next) => {
  const invoice = await Invoice.findById(req.params.id).populate({ path: 'payments.bankAccount' });

  if (!invoice) {
    return next(
      new ErrorResponse(
        `Invoice with ID ${req.params.id} not exists`,
        404
      )
    );
  }

  res.status(200).json({
    success: true,
    length: invoice.payments.length,
    data: invoice.payments
  });
});

/**
 * @desc    Update invoice tax
 * @route   PUT /api/v1/invoices/:id
 * @access  Private / admin, finance
 */
exports.addTax = asyncHandler(async (req, res, next) => {
  const invoice = await Invoice.findById(req.params.id).populate({
    path: 'deliveryOrder', 
    populate: {
      path: 'salesorder',
      populate: {
        path: 'quotation',
        populate: {
          path: 'customer'
        }
      }
    }
  });

  if (!invoice) {
    return next(
      new ErrorResponse(
        `Invoice with ID ${req.params.id} not exists`,
        404
      )
    );
  }

  if (invoice.tax !== null) {
    return next(
      new ErrorResponse(
        `Tax for invoice ${invoice.invoiceNumberLong} has been set up`,
        400
      )
    );
  }

  invoice.tax = req.body.tax;
  invoice.grandtotal = invoice.subtotal + (invoice.subtotal * invoice.tax / 100);
  await invoice.validate();
  await invoice.save();
  res.status(200).json({
    success: true,
    data: invoice
  })
});