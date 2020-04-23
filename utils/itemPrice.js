/**
 * @file Item Price Utilities
 * @copyright Phire Studio, 2019
 * @version 1.0.0
 * @module utils/itemPrice
 */

exports.itemPrice = (itemCost, itemProfit) => {
  if (itemProfit <= 1) {
    return itemCost * (1 + itemProfit);
  }
  return itemCost + itemProfit;
}