'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDataGrid = require('react-data-grid');

var _reactDataGrid2 = _interopRequireDefault(_reactDataGrid);

var _Dialog = require('material-ui/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _SvgIcon = require('material-ui/SvgIcon');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

var _Snackbar = require('material-ui/Snackbar');

var _Snackbar2 = _interopRequireDefault(_Snackbar);

var _utils = require('./utils');

require('./styles.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //eslint-disable-line


//eslint-disable-line

var AddColumnIcon = function AddColumnIcon(props) {
  return _react2.default.createElement(
    _SvgIcon2.default
    // viewBox="1872 1471 100 100"
    ,
    props,
    _react2.default.createElement('path', { className: 'cls-1',
      d: 'M2.34,1.44H7V22.56H2.34Zm6.24,0h4.66V22.56H8.58ZM19.9,7.09V5.33H18.72V7.09H17V8.27h1.76V10H19.9V8.27h1.76V7.09ZM15,22.56V1.44h4.8V3.6h-1V2.4H16V21.6h2.88V11.52h1v11Z'
    })
  );
};

var AddRowIcon = function AddRowIcon(props) {
  return _react2.default.createElement(
    _SvgIcon2.default
    // viewBox="1872 1471 100 100"
    ,
    props,
    _react2.default.createElement('path', { className: 'cls-1',
      d: 'M22.56,2V6.69H1.44V2Zm0,6.24v4.66H1.44V8.27ZM16.91,19.59h1.76V18.41H16.91V16.65H15.73v1.76H14v1.18h1.76v1.76h1.18ZM1.44,14.68H22.56v4.8H20.4v-1h1.2V15.64H2.4v2.88H12.48v1h-11Z'
    })
  );
};

var EditableTable = function (_Component) {
  _inherits(EditableTable, _Component);

  function EditableTable(props) {
    _classCallCheck(this, EditableTable);

    var _this = _possibleConstructorReturn(this, (EditableTable.__proto__ || Object.getPrototypeOf(EditableTable)).call(this, props));

    _this.state = {
      isNewColumnDialogOpen: false,
      rows: (0, _utils.generateRows)(props.data),
      columns: (0, _utils.generateColumns)(props.data),
      updating: false,
      deleting: false,
      newColumnName: '',
      tableHeader: props.title,
      tableFootNote: props.footnote
    };

    _this.getRow = _this.getRow.bind(_this);
    _this.onUpdateData = _this.onUpdateData.bind(_this);
    _this.addColumn = _this.addColumn.bind(_this);
    _this.addRow = _this.addRow.bind(_this);
    _this.onOpenDialog = _this.onOpenDialog.bind(_this);
    _this.onCloseDialog = _this.onCloseDialog.bind(_this);
    _this.onSave = _this.onSave.bind(_this);
    _this.onChangeColumnName = _this.onChangeColumnName.bind(_this);
    _this.onChangeTableHeader = _this.onChangeTableHeader.bind(_this);
    _this.onChangeTableFootnote = _this.onChangeTableFootnote.bind(_this);
    _this.deleteRow = _this.deleteRow.bind(_this);
    _this.deleteColumn = _this.deleteColumn.bind(_this);
    _this.doneDeleting = _this.doneDeleting.bind(_this);
    _this.deleteTableData = _this.deleteTableData.bind(_this);
    _this.checkAndUpdateColHead = _this.checkAndUpdateColHead.bind(_this);
    return _this;
  }

  _createClass(EditableTable, [{
    key: 'getRow',
    value: function getRow(i) {
      var rows = this.state.rows;

      return rows[i];
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      // console.log('initialRows', this.state.rows);
    }
  }, {
    key: 'onUpdateData',
    value: function onUpdateData(_ref) {
      var fromRow = _ref.fromRow,
          fromRowData = _ref.fromRowData,
          updated = _ref.updated;
      //eslint-disable-line

      var rows = this.state.rows;
      var onChangeData = this.props.onChangeData;


      var newObject = _extends({}, fromRowData, updated);
      var rowsCopy = rows;
      rowsCopy[fromRow] = newObject;
      var array = [];
      if (fromRow === 0) {
        var oldColumnName = Object.keys(updated)[0];
        var newColumnName = updated[Object.keys(updated)[0]];

        rowsCopy.forEach(function (item) {
          var obj = {};
          Object.keys(item).forEach(function (ita) {
            if (ita !== oldColumnName) {
              obj[ita] = item[ita];
            } else {
              obj[newColumnName] = item[ita];
            }
          });
          array.push(obj);
        });
      } else {
        array = rowsCopy;
      }

      // console.log('prposedUpdate', [...rowsCopy]);
      this.setState({
        rows: (0, _utils.generateRows)([].concat(_toConsumableArray(array)).splice(1, rowsCopy.length)),
        columns: (0, _utils.generateColumns)([].concat(_toConsumableArray(array)).splice(1, rowsCopy.length))
      }, function () {
        // console.log('newRows', rowsCopy);
      });

      rowsCopy = this.checkAndUpdateColHead(rowsCopy);

      // console.log(rowsCopy);
      onChangeData(rowsCopy.splice(1, rowsCopy.length));
    }
  }, {
    key: 'addRow',
    value: function addRow() {
      var _this2 = this;

      var _state = this.state,
          columns = _state.columns,
          rows = _state.rows;
      var onChangeData = this.props.onChangeData;


      this.setState({
        updating: true
      });

      var newRow = {};
      var oldRows = rows;
      columns.forEach(function (item) {
        newRow[item.key] = '';
      });

      newRow.id = oldRows.length + 1;

      oldRows.push(newRow);

      setTimeout(function () {
        _this2.setState({
          updating: false,
          rows: oldRows
        }, onChangeData(oldRows));
      }, 100);
    }
  }, {
    key: 'addColumn',
    value: function addColumn(newColumnName) {
      var _this3 = this;

      var _state2 = this.state,
          columns = _state2.columns,
          rows = _state2.rows;
      var onChangeData = this.props.onChangeData;


      this.setState({
        updating: true
      });

      // const newColumnName = `newrow${Math.random().toFixed(3)}`;

      var currentColumns = columns;
      var currentRows = rows;

      currentColumns.push({ key: newColumnName, name: newColumnName, editable: true });

      currentRows.forEach(function (item) {
        item[newColumnName] = ''; //eslint-disable-line
      });

      currentRows[0][newColumnName] = newColumnName;

      setTimeout(function () {
        _this3.setState({
          updating: false,
          columns: currentColumns,
          rows: currentRows
        }, onChangeData(currentRows));
      }, 100);
    }
  }, {
    key: 'checkAndUpdateColHead',
    value: function checkAndUpdateColHead(obj) {
      // eslint-disable-line
      var targetedHead = '';
      var changedValue = '';
      var newArray = [];
      var newObject = {};
      Object.keys(obj[0]).map(function (colHead) {
        // eslint-disable-line
        if (colHead !== obj[0][colHead]) {
          targetedHead = colHead;
          changedValue = obj[0][colHead];
        }
      });
      if (targetedHead !== '' && changedValue !== '') {
        obj.map(function (unitObj) {
          // eslint-disable-line
          newObject = {};
          Object.keys(unitObj).map(function (key) {
            // eslint-disable-line
            if (key === targetedHead) {
              newObject[changedValue] = unitObj[targetedHead];
            } else {
              newObject[key] = unitObj[key];
            }
          });
          newArray[newArray.length] = newObject;
        });
      }
      if (newArray.length > 0) {
        return newArray;
      } else {
        return obj;
      }
    }
  }, {
    key: 'deleteRow',
    value: function deleteRow() {
      this.setState({ deleting: 'rows' });
    }
  }, {
    key: 'deleteColumn',
    value: function deleteColumn() {
      this.setState({ deleting: 'columns' });
    }
  }, {
    key: 'doneDeleting',
    value: function doneDeleting() {
      this.setState({ deleting: false });
    }
  }, {
    key: 'deleteTableData',
    value: function deleteTableData(rowOrCol, v) {
      // eslint-disable-line
      var onChangeData = this.props.onChangeData;


      if (rowOrCol === 'columns' && v.initialKeyCode === 'Delete') {
        var newCols = [];
        var _i = 0;
        for (_i = 0; _i < this.state.columns.length; _i += 1) {
          // eslint-disable-line
          if (_i !== v.idx) {
            newCols.push(this.state.columns[_i]); // eslint-disable-line
          }
        }
        this.setState({ columns: newCols });

        var j = 0;
        for (j = 0; j < this.state.rows.length; j += 1) {
          // eslint-disable-line
          delete this.state.rows[j]['']; // eslint-disable-line
        }
      } else if (rowOrCol === 'rows' && v.initialKeyCode === 'Delete') {
        var newRows = [];
        var _i2 = 0;
        for (_i2 = 0; _i2 < this.state.rows.length; _i2 += 1) {
          // eslint-disable-line
          if (_i2 !== v.rowIdx) {
            newRows.push(this.state.rows[_i2]); // eslint-disable-line
          }
        }
        this.state.rows = newRows;
      }
      // console.log('rows', this.state.rows);
      var returnRows = [];
      var i = 1;
      for (i = 1; i < this.state.rows.length; i += 1) {
        // eslint-disable-line
        returnRows.push(this.state.rows[i]); // eslint-disable-line
      }
      console.log(returnRows);
      onChangeData(returnRows);
    }
  }, {
    key: 'onSave',
    value: function onSave(newColumnName) {
      this.addColumn(newColumnName);
      this.setState({
        isNewColumnDialogOpen: false
      });
    }
  }, {
    key: 'onChangeColumnName',
    value: function onChangeColumnName(e, newValue) {
      this.setState({
        newColumnName: newValue
      });
    }
  }, {
    key: 'onChangeTableHeader',
    value: function onChangeTableHeader(e, newValue) {
      var onChangeTitle = this.props.onChangeTitle;

      this.setState({
        tableHeader: newValue
      }, onChangeTitle(newValue));
    }
  }, {
    key: 'onChangeTableFootnote',
    value: function onChangeTableFootnote(e, newValue) {
      var onChangeFootnote = this.props.onChangeFootnote;


      this.setState({
        tableFootNote: newValue
      }, onChangeFootnote(newValue));
    }
  }, {
    key: 'onOpenDialog',
    value: function onOpenDialog() {
      this.setState({
        isNewColumnDialogOpen: true
      });
    }
  }, {
    key: 'onCloseDialog',
    value: function onCloseDialog() {
      this.setState({
        isNewColumnDialogOpen: false
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _state3 = this.state,
          rows = _state3.rows,
          columns = _state3.columns,
          newColumnName = _state3.newColumnName,
          tableHeader = _state3.tableHeader,
          updating = _state3.updating,
          isNewColumnDialogOpen = _state3.isNewColumnDialogOpen,
          tableFootNote = _state3.tableFootNote;


      var actions = [_react2.default.createElement(_FlatButton2.default, {
        label: 'Cancel',
        primary: true,
        onClick: this.onCloseDialog
      }), _react2.default.createElement(_FlatButton2.default, {
        label: 'Submit',
        primary: true,
        keyboardFocused: true,
        onClick: function onClick() {
          _this4.onSave(newColumnName);
        }
      })];

      return _react2.default.createElement(
        'div',
        { className: 'editable-table m-3' },
        _react2.default.createElement(_Snackbar2.default, {
          open: this.state.deleting === 'columns' || this.state.deleting === 'rows',
          message: _react2.default.createElement(
            'div',
            null,
            'Select the ' + (this.state.deleting === 'columns' ? 'column head' : 'row') + '. Press Delete & Then Enter.',
            _react2.default.createElement(_FlatButton2.default, { labelStyle: { color: '#FFF' }, className: 'float-right mr-1 ml-3 mt-2', label: 'Done Deleting', onClick: this.doneDeleting })
          ),
          autoHideDuration: 4000,
          onRequestClose: function onRequestClose() {}
        }),
        _react2.default.createElement(_TextField2.default, { fullWidth: true, name: 'tableTitle', floatingLabelText: 'Enter table title', value: tableHeader, onChange: this.onChangeTableHeader }),
        _react2.default.createElement('br', null),
        _react2.default.createElement('br', null),
        _react2.default.createElement(
          'small',
          { style: { color: 'rgba(0,0,0,0.3)' } },
          'Enter table data'
        ),
        _react2.default.createElement(_FlatButton2.default, { icon: _react2.default.createElement(AddColumnIcon, null), primary: true, className: 'float-right mr-1 ', label: 'Delete Column', onClick: this.deleteColumn }),
        _react2.default.createElement(_FlatButton2.default, { icon: _react2.default.createElement(AddRowIcon, null), primary: true, className: 'float-right mr-1 ', label: 'Delete Row', onClick: this.deleteRow }),
        _react2.default.createElement(_FlatButton2.default, { icon: _react2.default.createElement(AddColumnIcon, null), primary: true, className: 'float-right mr-1 ', label: 'Add Column', onClick: this.onOpenDialog }),
        _react2.default.createElement(_FlatButton2.default, { icon: _react2.default.createElement(AddRowIcon, null), primary: true, className: 'float-right mr-1 ', label: 'Add Row', onClick: this.addRow }),
        !updating && _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_reactDataGrid2.default, {
            onCellDeSelected: function onCellDeSelected(v) {
              if (_this4.state.deleting) {
                _this4.deleteTableData(_this4.state.deleting, v);
              } // eslint-disable-line
            },
            columns: columns,
            enableCellSelect: true,
            rowGetter: this.getRow,
            rowsCount: rows.length,
            minHeight: 35 * rows.length + 25,
            onGridRowsUpdated: this.onUpdateData
          })
        ),
        updating && _react2.default.createElement(
          'div',
          null,
          'Updating'
        ),
        _react2.default.createElement(
          _Dialog2.default,
          {
            title: 'Add new column',
            actions: actions,
            modal: false,
            open: isNewColumnDialogOpen,
            onRequestClose: this.onCloseDialog
          },
          _react2.default.createElement(_TextField2.default, {
            fullWidth: true,
            floatingLabelText: 'Enter the name of the new column',
            onChange: this.onChangeColumnName,
            value: newColumnName
          })
        ),
        _react2.default.createElement(_TextField2.default, {
          fullWidth: true,
          name: 'tableFootNote',
          floatingLabelText: 'Enter footnotes (if any)',
          value: tableFootNote,
          onChange: this.onChangeTableFootnote
        })
      );
    }
  }]);

  return EditableTable;
}(_react.Component);

exports.default = EditableTable;