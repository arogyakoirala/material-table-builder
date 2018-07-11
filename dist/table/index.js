'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Table = require('material-ui/Table');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //eslint-disable-line


// import './styles.scss';

var RenderTable = function (_Component) {
  _inherits(RenderTable, _Component);

  function RenderTable(props) {
    _classCallCheck(this, RenderTable);

    var _this = _possibleConstructorReturn(this, (RenderTable.__proto__ || Object.getPrototypeOf(RenderTable)).call(this, props));

    _this.state = {};

    _this.getColumnHeaders = _this.getColumnHeaders.bind(_this);
    return _this;
  }

  _createClass(RenderTable, [{
    key: 'getColumnHeaders',
    value: function getColumnHeaders(data) {
      //eslint-disable-line
      return Object.keys(data[0]);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          data = _props.data,
          title = _props.title,
          updating = _props.updating,
          footnote = _props.footnote;


      var columnHeaders = this.getColumnHeaders(data);

      if (updating) {
        return _react2.default.createElement('div', null);
      } else {
        return _react2.default.createElement(
          'div',
          { style: { backgroundColor: '#ececec', padding: '10px' } },
          _react2.default.createElement(
            'div',
            { style: { marginLeft: '5px', paddingBottom: '10px', fontSize: '1.3rem' } },
            _react2.default.createElement(
              'b',
              null,
              title
            )
          ),
          _react2.default.createElement(
            _Table.Table,
            { selectable: false },
            _react2.default.createElement(
              _Table.TableHeader,
              { displaySelectAll: false, adjustForCheckbox: false },
              _react2.default.createElement(
                _Table.TableRow,
                null,
                columnHeaders.map(function (item) {
                  return _react2.default.createElement(
                    _Table.TableHeaderColumn,
                    { key: Math.random() },
                    item
                  );
                })
              )
            ),
            _react2.default.createElement(
              _Table.TableBody,
              { displayRowCheckbox: false },
              data.map(function (item) {
                return _react2.default.createElement(
                  _Table.TableRow,
                  { key: Math.random() * 10 },
                  columnHeaders.map(function (columnName) {
                    return _react2.default.createElement(
                      _Table.TableRowColumn,
                      { key: Math.random() * 100 },
                      item[columnName]
                    );
                  })
                );
              })
            )
          ),
          _react2.default.createElement(
            'div',
            { style: {
                marginLeft: '5px', paddingBottom: '5px', paddingTop: '10px', color: '#666'
              }
            },
            footnote
          )
        );
      }
    }
  }]);

  return RenderTable;
}(_react.Component);

exports.default = RenderTable;