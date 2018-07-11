'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash.clonedeep');

var _lodash2 = _interopRequireDefault(_lodash);

var _table = require('../../table');

var _table2 = _interopRequireDefault(_table);

var _chart = require('../../chart');

var _chart2 = _interopRequireDefault(_chart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // eslint-disable-line


// import './styles.scss';


var Preview = function (_Component) {
  _inherits(Preview, _Component);

  function Preview(props) {
    _classCallCheck(this, Preview);

    var _this = _possibleConstructorReturn(this, (Preview.__proto__ || Object.getPrototypeOf(Preview)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(Preview, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          chartType = _props.chartType,
          data = _props.data,
          chartParams = _props.chartParams,
          title = _props.title,
          footnote = _props.footnote;

      // remove additional object with column names if exists.

      var dataCopy = (0, _lodash2.default)(data);
      var keys = Object.keys(data[0]);
      var finalData = data[0][keys[0]] === keys[0] ? dataCopy.splice(1, data.length) : dataCopy;

      return _react2.default.createElement(
        'div',
        null,
        chartType === 'table' && _react2.default.createElement(_table2.default, { data: finalData, title: title, footnote: footnote }),
        chartType === 'chart' && _react2.default.createElement(_chart2.default, { params: chartParams.params, title: title, data: finalData, footnote: footnote })
      );
    }
  }]);

  return Preview;
}(_react.Component);

exports.default = Preview;