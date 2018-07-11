'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Chart = exports.Table = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./styles.css');

var _wizard = require('./wizard');

var _wizard2 = _interopRequireDefault(_wizard);

var _table = require('./table');

var _table2 = _interopRequireDefault(_table);

var _chart = require('./chart');

var _chart2 = _interopRequireDefault(_chart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Table = _table2.default;
exports.Chart = _chart2.default;
exports.default = _wizard2.default;