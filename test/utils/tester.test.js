/**
 * @file Test Unit tester.js
 * @copyright Phire Studio, 2019
 * @version 1.0.0
 * @module tester-test
 */

const assert = require('chai').assert;
const tester = require('../../utils/tester');

/** Result vars */
let resultSayTest = tester.sayTest();
let resultAddNum = tester.addNum(2, 3);

/** File name to test */
describe('# tester', () => {
  /** File name to test */
  describe('sayTest()', () => {
    /** Unit test */
    it('should return type string', () => {
      assert.typeOf(resultSayTest, 'string');
    });

    it('should return test', () => {
      assert.equal(resultSayTest, 'test');
    });
  });

  describe('addNum()', () => {
    it('should return type number', () => {
      assert.typeOf(resultAddNum, 'number');
    });

    it('should above 3', () => {
      assert.isAbove(resultAddNum, 3);
    });
  });
});
