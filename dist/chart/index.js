'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _c = require('c3');

var _c2 = _interopRequireDefault(_c);

require('./styles.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //eslint-disable-line

// import numeral from 'numeral';
// import { sumBy } from 'lodash';
// import { connect } from 'react-redux';

var getChartReadyData = function getChartReadyData(params, data) {
  var x = params.categorical;
  var y = params.numeric;

  var newData = [];

  data.forEach(function (item, i) {
    newData.push({
      name: data[i][x],
      prop: Number(data[i][y])
    });
  });

  // console.log('chartReadyData', JSON.stringify(newData));
  return newData;
};

var Chart = function (_Component) {
  _inherits(Chart, _Component);

  function Chart(props) {
    _classCallCheck(this, Chart);

    var _this = _possibleConstructorReturn(this, (Chart.__proto__ || Object.getPrototypeOf(Chart)).call(this, props));

    _this.updateChart = _this.updateChart.bind(_this);
    return _this;
  }

  _createClass(Chart, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          params = _props.params,
          data = _props.data;
      // console.log('heresmydata',/ this.props.data);

      getChartReadyData(params, data);
      this.updateChart('en');
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      // this.chart.destroy();
      this.updateChart('en');
    }
  }, {
    key: 'updateChart',
    value: function updateChart(localeValue) {
      //eslint-disable-line

      var _props2 = this.props,
          data = _props2.data,
          params = _props2.params;
      // console.log('Updating Chart..');

      if (data) {
        var labels = [];
        getChartReadyData(params, data).forEach(function (item, i) {
          // console.log('labelitem', item);
          var obj = {};
          obj.value = i;
          obj.text = item.name;
          obj.position = 'start';
          // obj.dy = '-5';
          obj.class = 'label-text';
          labels.push(obj);
        });

        data.forEach(function (item) {
          item.prop = (item.prop * 100).toFixed(1); //eslint-disable-line
        });

        // console.log('chartData', getChartReadyData(this.props.chartParams, this.props.data));

        this.chart = _c2.default.generate({
          bindto: this.node,
          data: {
            json: getChartReadyData(params, data),
            colors: {
              prop: '#842e1f'
            },

            labels: {
              format: function format(v, id, i, j) {
                return id === 'prop' ? '' + v : '';
              }
            },
            classes: {
              prop: 'additional-data1-class'
            },
            keys: {
              x: 'name', // it's possible to specify 'x' when category axis
              value: ['prop']
            },
            type: 'bar'

          },
          bar: {
            width: {
              ratio: 0.4
            }
          },
          legend: {
            show: false
          },
          axis: {
            rotated: true,
            x: {
              show: false,
              type: 'category'
            },
            y: {
              min: -Math.max.apply(Math, _toConsumableArray(getChartReadyData(params, data).map(function (o) {
                return o.prop;
              }))) * 0.4,
              // max: 100,
              show: false
            }
          },
          grid: {
            x: {
              show: true,
              lines: labels
            },

            y: {
              lines: [{ value: 0, text: '' }]
            },
            focus: {
              show: false

            }
          },
          tooltip: {
            contents: function contents(d, defaultTitleFormat, defaultValueFormat, color) {
              // const { index } = d[0];
              // const partOne = `<div style="text-transform:none;max-width:200px;text-align:left; background-color: rgba(255,255,255,0.8); padding:5px;border: 1px solid #ccc;">
              // <b>${getCategoryLabels(localeValue)[data[index].name]}:</b>  ${numeral(data[index].total).format('0,0')} (${data[index].prop}%) `;
              // const partTwo = '';
              //
              // const finalToolTip = partOne + partTwo;
              return null;
            }
          }
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props3 = this.props,
          title = _props3.title,
          footnote = _props3.footnote,
          data = _props3.data;

      if (data) {
        var height = 4.5 * data.length + 'vh';
        // console.log(height);

        return _react2.default.createElement(
          'div',
          { style: { padding: '10px', backgroundColor: '#ececec' } },
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
            'div',
            { style: { backgroundColor: '#fff', padding: '10px' } },
            _react2.default.createElement('div', {
              ref: function ref(node) {
                return _this2.node = node;
              } //eslint-disable-line
              , className: 'horizontal-bar-en',
              style: { minHeight: height, width: '100%' }
            })
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
      } else {
        return _react2.default.createElement('div', null);
      }
    }
  }]);

  return Chart;
}(_react.Component);

exports.default = Chart;