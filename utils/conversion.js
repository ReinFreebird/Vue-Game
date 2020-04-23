/**
 * @file Convert some string format
 * @copyright Phire Studio, 2020
 * @version 1.0.0
 * @module utils/conversion
 */

exports.pad = num => ('0000' + num).substr(-4) ;
exports.getFullDate =  dates => {
    const d = new Date(dates);
    return ('00' + (d.getMonth() + 1)).substr(-2) + ('00' + d.getDate()).substr(-2) + d.getFullYear()
}

