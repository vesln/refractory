/**
 * External dependencies.
 */

var chai = require('chai');

/**
 * Register `expect`.
 */

global.expect = chai.expect;

/**
 * Include stack traces.
 */

chai.Assertion.includeStack = true;
