'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Stepper = require('material-ui/Stepper');

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _lodash = require('lodash.clonedeep');

var _lodash2 = _interopRequireDefault(_lodash);

var _editableTable = require('./editable-table');

var _editableTable2 = _interopRequireDefault(_editableTable);

var _selectChart = require('./select-chart');

var _selectChart2 = _interopRequireDefault(_selectChart);

var _preview = require('./preview');

var _preview2 = _interopRequireDefault(_preview);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //eslint-disable-line


var Wizard = function (_React$Component) {
  _inherits(Wizard, _React$Component);

  function Wizard(props) {
    _classCallCheck(this, Wizard);

    var _this = _possibleConstructorReturn(this, (Wizard.__proto__ || Object.getPrototypeOf(Wizard)).call(this, props));

    _this.state = {
      activeStep: 0,
      data: props.config.data,
      title: props.config.title || '',
      footnote: props.config.footnote || '',
      chartType: 'table',
      chartParams: {}
    };

    _this.onChangeData = _this.onChangeData.bind(_this);
    _this.onChangeTitle = _this.onChangeTitle.bind(_this);
    _this.onChangeFootnote = _this.onChangeFootnote.bind(_this);
    _this.onChangeChartType = _this.onChangeChartType.bind(_this);
    _this.onChangeChartParams = _this.onChangeChartParams.bind(_this);
    _this.onSubmit = _this.onSubmit.bind(_this);
    return _this;
  }

  _createClass(Wizard, [{
    key: 'onChangeData',
    value: function onChangeData(updatedData) {
      this.setState({ data: updatedData });
      // setTimeout(() => {
      // }, 10);
    }
  }, {
    key: 'onChangeTitle',
    value: function onChangeTitle(newTitle) {
      this.setState({
        title: newTitle
      });
    }
  }, {
    key: 'onChangeFootnote',
    value: function onChangeFootnote(newFootnote) {
      this.setState({
        footnote: newFootnote
      });
    }
  }, {
    key: 'onChangeChartType',
    value: function onChangeChartType(v) {
      this.setState({
        chartType: v
      });
    }
  }, {
    key: 'onChangeChartParams',
    value: function onChangeChartParams(newParams) {
      this.setState({ chartParams: newParams });
    }
  }, {
    key: 'onSubmit',
    value: function onSubmit() {
      var _state = this.state,
          title = _state.title,
          data = _state.data,
          footnote = _state.footnote,
          chartParams = _state.chartParams,
          chartType = _state.chartType;
      var onSubmit = this.props.onSubmit;

      // remove additional object with column names if exists.

      var dataCopy = (0, _lodash2.default)(data);
      var keys = Object.keys(data[0]);
      var finalData = data[0][keys[0]] === keys[0] ? dataCopy.splice(1, data.length) : dataCopy;

      var submissionData = {
        title: title,
        data: finalData,
        footnote: footnote,
        params: chartParams.params,
        chartType: chartType
      };

      onSubmit(submissionData);
    }
  }, {
    key: 'renderStepperControls',
    value: function renderStepperControls() {
      var _this2 = this;

      var activeStep = this.state.activeStep;

      return _react2.default.createElement(
        'div',
        { style: { marginTop: 12 }, className: 'float-right' },
        _react2.default.createElement(_FlatButton2.default, {
          label: 'Back',
          disabled: activeStep === 0,
          onClick: function onClick() {
            _this2.setState({ activeStep: activeStep - 1 });
          },
          style: { marginRight: 12 }
        }),
        activeStep !== 2 && _react2.default.createElement(_RaisedButton2.default, {
          label: 'Next',
          disabled: false,
          onClick: function onClick() {
            _this2.setState({ activeStep: activeStep + 1 });
          },
          primary: true
        }),
        activeStep === 2 && _react2.default.createElement(_RaisedButton2.default, {
          label: 'Submit Chart',
          disabled: false,
          onClick: function onClick() {
            console.log('clickes');_this2.onSubmit();
          },
          primary: true
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _state2 = this.state,
          data = _state2.data,
          title = _state2.title,
          footnote = _state2.footnote,
          activeStep = _state2.activeStep,
          chartType = _state2.chartType,
          chartParams = _state2.chartParams;


      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _Stepper.Stepper,
          { linear: false, activeStep: activeStep, orientation: 'vertical' },
          _react2.default.createElement(
            _Stepper.Step,
            null,
            _react2.default.createElement(
              _Stepper.StepLabel,
              null,
              'Add Data'
            ),
            _react2.default.createElement(
              _Stepper.StepContent,
              null,
              _react2.default.createElement(
                'p',
                null,
                'Please start by providing data for the table and/or graph.',
                ' ',
                _react2.default.createElement('br', null),
                'We have populated a default table for you, but feel free to modify any content within the table, or add/update new rows and columns.'
              ),
              _react2.default.createElement(_editableTable2.default, {
                onChangeTitle: this.onChangeTitle,
                onChangeFootnote: this.onChangeFootnote,
                onChangeData: this.onChangeData,
                data: data,
                title: title,
                footnote: footnote
              }),
              this.renderStepperControls()
            )
          ),
          _react2.default.createElement(
            _Stepper.Step,
            null,
            _react2.default.createElement(
              _Stepper.StepLabel,
              null,
              'Select type of rendering'
            ),
            _react2.default.createElement(
              _Stepper.StepContent,
              null,
              _react2.default.createElement(
                'p',
                null,
                'Please select how you would want to display this information.'
              ),
              _react2.default.createElement(_selectChart2.default, {
                onChangeChartParams: this.onChangeChartParams,
                onChangeChartType: this.onChangeChartType,
                chartType: chartType,
                tableName: title,
                data: data
              }),
              this.renderStepperControls()
            )
          ),
          _react2.default.createElement(
            _Stepper.Step,
            null,
            _react2.default.createElement(
              _Stepper.StepLabel,
              null,
              'Preview results'
            ),
            _react2.default.createElement(
              _Stepper.StepContent,
              null,
              _react2.default.createElement(_preview2.default, {
                chartParams: chartParams,
                data: data,
                title: title,
                footnote: footnote,
                chartType: chartType
              }),
              this.renderStepperControls()
            )
          )
        )
      );
    }
  }]);

  return Wizard;
}(_react2.default.Component);

exports.default = Wizard;