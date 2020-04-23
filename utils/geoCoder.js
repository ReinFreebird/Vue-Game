/**
 * @file Geocoder Utilities
 * @copyright Phire Studio, 2019
 * @version 1.0.0
 * @module utils/geocoder
 */

const NodeGeocoder = require('node-geocoder');

const options = {
  provider: process.env.GEOCODER_PROVIDER,
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null,
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;
