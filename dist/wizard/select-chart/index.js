'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _RadioButton = require('material-ui/RadioButton');

var _SelectField = require('material-ui/SelectField');

var _SelectField2 = _interopRequireDefault(_SelectField);

var _MenuItem = require('material-ui/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //eslint-disable-line


var arraysEqual = function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (var i = arr1.length; i -= 1;) {
    //eslint-disable-line
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
};
// import './styles.scss';
var styles = {
  block: {
    maxWidth: 250
  },
  radioButton: {
    // marginBottom: 16,
  }
};

var SelectChartType = function (_Component) {
  _inherits(SelectChartType, _Component);

  function SelectChartType(props) {
    _classCallCheck(this, SelectChartType);

    var _this = _possibleConstructorReturn(this, (SelectChartType.__proto__ || Object.getPrototypeOf(SelectChartType)).call(this, props));

    _this.state = {
      selectedChartType: props.chartType,
      numericColumns: [],
      categoricalColumns: []
    };

    _this.onSelectionChange = _this.onSelectionChange.bind(_this);
    return _this;
  }

  _createClass(SelectChartType, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var data = this.props.data;


      this.getColumnsByType(data);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var data = this.props.data;

      var isThereChange = !arraysEqual(Object.keys(data[0]), Object.keys(prevProps.data[0]));
      // console.log('istherechange', isThereChange);
      if (isThereChange) {
        this.getColumnsByType(data);
      }
    }
  }, {
    key: 'onChartParamChange',
    value: function onChartParamChange(type, value) {
      var _state = this.state,
          categoricalColumns = _state.categoricalColumns,
          numericColumns = _state.numericColumns,
          categoricalColumnValue = _state.categoricalColumnValue,
          numericColumnValue = _state.numericColumnValue;
      var onChangeChartParams = this.props.onChangeChartParams;


      switch (type) {
        case 'categorical':
          this.setState({
            categoricalColumnValue: categoricalColumns[value]
          }, onChangeChartParams({ params: { categorical: categoricalColumns[value], numeric: numericColumnValue } }));
          break;
        case 'numeric':
          this.setState({
            numericColumnValue: numericColumns[value]
          }, onChangeChartParams({ params: { categorical: categoricalColumnValue, numeric: numericColumns[value] } }));
          break;
        default:
          break;
      }
    }
  }, {
    key: 'checkForDisabled',
    value: function checkForDisabled(data) {
      //eslint-disable-line
      // console.log('initialData', data);
      var keys = Object.keys(data[0]);
      // console.log(keys);

      var stats = {};
      keys.forEach(function (key) {
        stats[key] = 0;
      });

      data.forEach(function (item) {
        keys.forEach(function (key) {
          // console.log(item[key]);
          if (!isNaN(item[key])) {
            //eslint-disable-line
            stats[key] += 1;
          }
        });
      });

      var numericColumns = [];
      var categoricalColumns = [];

      keys.forEach(function (key) {
        if (stats[key] === data.length) {
          numericColumns.push(key);
        } else {
          categoricalColumns.push(key);
        }
      });

      // console.log('numericColumns', numericColumns);
      if (numericColumns.length > 0) {
        return false;
      }
      return true;
    }
  }, {
    key: 'getColumnsByType',
    value: function getColumnsByType(data) {
      var onChangeChartParams = this.props.onChangeChartParams;


      var keys = Object.keys(data[0]);
      // console.log(keys);

      var stats = {};
      keys.forEach(function (key) {
        stats[key] = 0;
      });

      data.forEach(function (item) {
        keys.forEach(function (key) {
          // console.log(item[key]);
          if (!isNaN(item[key])) {
            //eslint-disable-line
            stats[key] += 1;
          }
        });
      });

      var numericColumns = [];
      var categoricalColumns = [];

      keys.forEach(function (key) {
        if (stats[key] === data.length) {
          numericColumns.push(key);
        } else {
          categoricalColumns.push(key);
        }
      });

      this.setState({
        numericColumns: numericColumns,
        categoricalColumns: categoricalColumns,
        numericColumnValue: numericColumns[0],
        categoricalColumnValue: categoricalColumns[0]
      });

      onChangeChartParams({ params: { categorical: categoricalColumns[0], numeric: numericColumns[0] } });
    }
  }, {
    key: 'onSelectionChange',
    value: function onSelectionChange(e, v) {
      var onChangeChartType = this.props.onChangeChartType;
      // console.log(v);

      this.setState({
        selectedChartType: v
      }, onChangeChartType(v));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state2 = this.state,
          selectedChartType = _state2.selectedChartType,
          categoricalColumns = _state2.categoricalColumns,
          categoricalColumnValue = _state2.categoricalColumnValue,
          numericColumns = _state2.numericColumns,
          numericColumnValue = _state2.numericColumnValue;
      var data = this.props.data;


      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _RadioButton.RadioButtonGroup,
          { onChange: this.onSelectionChange, name: 'shipSpeed', defaultSelected: selectedChartType },
          _react2.default.createElement(_RadioButton.RadioButton, {
            value: 'table',
            label: 'Display as a table',
            style: styles.radioButton
          }),
          _react2.default.createElement(_RadioButton.RadioButton, {
            value: 'chart',
            disabled: this.checkForDisabled(data),
            label: this.checkForDisabled(data) ? 'Display as a bar chart (disabled; make sure the table contains at least one column with only numeric values)' : 'Display as a bar chart',
            style: styles.radioButton
          })
        ),
        selectedChartType === 'chart' && _react2.default.createElement(
          'div',
          { style: { marginLeft: '40px', backgroundColor: '#f2f2f2', padding: '10px' } },
          _react2.default.createElement(
            'p',
            null,
            _react2.default.createElement(
              'b',
              null,
              'Specify chart parameters'
            )
          ),
          _react2.default.createElement(
            'div',
            { style: { backgroundColor: '#fff', padding: '10px' } },
            _react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(
                'div',
                { className: 'col-6' },
                _react2.default.createElement(
                  _SelectField2.default,
                  {
                    onChange: function onChange(e, nv) {
                      _this2.onChartParamChange('categorical', nv);
                    },
                    fullWidth: true,
                    value: categoricalColumnValue,
                    floatingLabelText: 'Select X-axis (categorical axis)'
                  },
                  categoricalColumns.map(function (item) {
                    return _react2.default.createElement(_MenuItem2.default, { key: Math.random(), primaryText: item, value: item });
                  })
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'col-6' },
                _react2.default.createElement(
                  _SelectField2.default,
                  {
                    onChange: function onChange(e, nv) {
                      _this2.onChartParamChange('numeric', nv);
                    },
                    fullWidth: true,
                    value: numericColumnValue,
                    floatingLabelText: 'Select Y-axis (numeric axis)'
                  },
                  numericColumns.map(function (item) {
                    return _react2.default.createElement(_MenuItem2.default, { key: Math.random(), primaryText: item, value: item });
                  })
                )
              )
            )
          )
        )
      );
    }
  }]);

  return SelectChartType;
}(_react.Component);

exports.default = SelectChartType;