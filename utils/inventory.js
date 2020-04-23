/**
 * @file Inventory Utilities
 * @copyright Phire Studio, 2020
 * @version 1.0.0
 * @module utils/inventory
 */

exports.sales = (stock, quantity) => {
    return stock - quantity;
}

exports.purchase = (stock, quantity) => {
    return stock + quantity;
}