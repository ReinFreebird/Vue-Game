/**
 * @file Pricing Utilities
 * @copyright Phire Studio, 2019
 * @version 1.0.0
 * @module utils/pricing
 */

exports.amount = (qty, unitPrice) => {
    var res = [];
    for (i = 0; i < qty.length; i++) {
        res.push(qty[i]*unitPrice[i]);
    }
    return res;
}

exports.subtotal = amounts => {
    return amounts.reduce((a, b) => a + b, 0)
}