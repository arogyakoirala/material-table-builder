'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var generateColumns = exports.generateColumns = function generateColumns(rows) {
  var keys = Object.keys(rows[0]);
  var columnArray = [];

  keys.forEach(function (item) {
    if (item !== 'id') {
      var newObj = { key: item, name: item, editable: true };
      columnArray.push(newObj);
    }
  });
  // Object.keys[rows[0]];

  return columnArray;
};

var generateRows = exports.generateRows = function generateRows(rows) {
  var keys = Object.keys(rows[0]);

  var newObj = {};
  keys.forEach(function (item) {
    if (item !== 'id') {
      newObj[item] = item;
    }
  });

  return [_extends({}, newObj)].concat(_toConsumableArray(rows));
};