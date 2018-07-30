import React, { Component } from 'react'; //eslint-disable-line
import ReactDataGrid from 'react-data-grid';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SvgIcon from 'material-ui/SvgIcon';
import Snackbar from 'material-ui/Snackbar';
import { generateRows, generateColumns } from './utils';
import './styles.css'; //eslint-disable-line

const AddColumnIcon = props => (
  <SvgIcon
    // viewBox="1872 1471 100 100"
    {...props}
  >
    <path className="cls-1"
      d="M2.34,1.44H7V22.56H2.34Zm6.24,0h4.66V22.56H8.58ZM19.9,7.09V5.33H18.72V7.09H17V8.27h1.76V10H19.9V8.27h1.76V7.09ZM15,22.56V1.44h4.8V3.6h-1V2.4H16V21.6h2.88V11.52h1v11Z"
    />

  </SvgIcon>
);


const AddRowIcon = props => (
  <SvgIcon
    // viewBox="1872 1471 100 100"
    {...props}
  >
    <path className="cls-1"
      d="M22.56,2V6.69H1.44V2Zm0,6.24v4.66H1.44V8.27ZM16.91,19.59h1.76V18.41H16.91V16.65H15.73v1.76H14v1.18h1.76v1.76h1.18ZM1.44,14.68H22.56v4.8H20.4v-1h1.2V15.64H2.4v2.88H12.48v1h-11Z"
    />

  </SvgIcon>
);

class EditableTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isNewColumnDialogOpen: false,
      rows: generateRows(props.data),
      columns: generateColumns(props.data),
      updating: false,
      deleting: false,
      newColumnName: '',
      tableHeader: props.title,
      tableFootNote: props.footnote,
    };

    this.getRow = this.getRow.bind(this);
    this.onUpdateData = this.onUpdateData.bind(this);
    this.addColumn = this.addColumn.bind(this);
    this.addRow = this.addRow.bind(this);
    this.onOpenDialog = this.onOpenDialog.bind(this);
    this.onCloseDialog = this.onCloseDialog.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onChangeColumnName = this.onChangeColumnName.bind(this);
    this.onChangeTableHeader = this.onChangeTableHeader.bind(this);
    this.onChangeTableFootnote = this.onChangeTableFootnote.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.deleteColumn = this.deleteColumn.bind(this);
    this.doneDeleting = this.doneDeleting.bind(this);
    this.deleteTableData = this.deleteTableData.bind(this);
    this.checkAndUpdateColHead = this.checkAndUpdateColHead.bind(this);
  }

  getRow(i) {
    const { rows } = this.state;
    return rows[i];
  }

  componentDidMount() {
    // console.log('initialRows', this.state.rows);
  }

  onUpdateData({ fromRow, fromRowData, updated }) { //eslint-disable-line

    const { rows } = this.state;
    const { onChangeData } = this.props;

    const newObject = { ...fromRowData, ...updated };
    let rowsCopy = rows;
    rowsCopy[fromRow] = newObject;
    let array = [];
    if (fromRow === 0) {
      const oldColumnName = Object.keys(updated)[0];
      const newColumnName = updated[Object.keys(updated)[0]];

      rowsCopy.forEach((item) => {
        const obj = {};
        Object.keys(item).forEach((ita) => {
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
      rows: generateRows([...array].splice(1, rowsCopy.length)),
      columns: generateColumns([...array].splice(1, rowsCopy.length)),
    }, () => {
      // console.log('newRows', rowsCopy);
    });

    rowsCopy = this.checkAndUpdateColHead(rowsCopy);

    // console.log(rowsCopy);
    onChangeData(rowsCopy.splice(1, rowsCopy.length));
  }

  addRow() {
    const { columns, rows } = this.state;
    const { onChangeData } = this.props;

    this.setState({
      updating: true,
    });

    const newRow = {};
    const oldRows = rows;
    columns.forEach((item) => {
      newRow[item.key] = '';
    });

    newRow.id = oldRows.length + 1;


    oldRows.push(newRow);

    setTimeout(() => {
      this.setState({
        updating: false,
        rows: oldRows,
      }, onChangeData(oldRows));
    }, 100);
  }

  addColumn(newColumnName) {
    const { columns, rows } = this.state;
    const { onChangeData } = this.props;

    this.setState({
      updating: true,
    });

    // const newColumnName = `newrow${Math.random().toFixed(3)}`;

    const currentColumns = columns;
    const currentRows = rows;

    currentColumns.push({ key: newColumnName, name: newColumnName, editable: true });


    currentRows.forEach((item) => {
      item[newColumnName] = ''; //eslint-disable-line
    });

    currentRows[0][newColumnName] = newColumnName;

    setTimeout(() => {
      this.setState({
        updating: false,
        columns: currentColumns,
        rows: currentRows,
      }, onChangeData(currentRows));
    }, 100);
  }

  checkAndUpdateColHead(obj) { // eslint-disable-line
    let targetedHead = '';
    let changedValue = '';
    const newArray = [];
    let newObject = {};
    Object.keys(obj[0]).map((colHead) => { // eslint-disable-line
      if (colHead !== obj[0][colHead]) {
        targetedHead = colHead;
        changedValue = obj[0][colHead];
      }
    });
    if (targetedHead !== '' && changedValue !== '') {
      obj.map((unitObj) => { // eslint-disable-line
        newObject = {};
        Object.keys(unitObj).map((key) => { // eslint-disable-line
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

  deleteRow() {
    this.setState({ deleting: 'rows' });
  }

  deleteColumn() {
    this.setState({ deleting: 'columns' });
  }

  doneDeleting() {
    this.setState({ deleting: false });
  }

  deleteTableData(rowOrCol, v) { // eslint-disable-line
    const { onChangeData } = this.props;

    if (rowOrCol === 'columns' && v.initialKeyCode === 'Delete') {
      const newCols = [];
      let i = 0;
      for (i = 0; i < this.state.columns.length; i += 1) { // eslint-disable-line
        if (i !== v.idx) {
          newCols.push(this.state.columns[i]); // eslint-disable-line
        }
      }
      this.setState({ columns: newCols });

      let j = 0;
      for (j = 0; j < this.state.rows.length; j += 1) { // eslint-disable-line
        delete this.state.rows[j]['']; // eslint-disable-line
      }
    } else if (rowOrCol === 'rows' && v.initialKeyCode === 'Delete') {
      const newRows = [];
      let i = 0;
      for (i = 0; i < this.state.rows.length; i += 1) { // eslint-disable-line
        if (i !== v.rowIdx) {
          newRows.push(this.state.rows[i]); // eslint-disable-line
        }
      }
      this.state.rows = newRows;
    }
    // console.log('rows', this.state.rows);
    const returnRows = [];
    let i = 1;
    for (i = 1; i < this.state.rows.length; i += 1) { // eslint-disable-line
      returnRows.push(this.state.rows[i]); // eslint-disable-line
    }
    console.log(returnRows);
    onChangeData(returnRows);
  }

  onSave(newColumnName) {
    this.addColumn(newColumnName);
    this.setState({
      isNewColumnDialogOpen: false,
    });
  }

  onChangeColumnName(e, newValue) {
    this.setState({
      newColumnName: newValue,
    });
  }

  onChangeTableHeader(e, newValue) {
    const { onChangeTitle } = this.props;
    this.setState({
      tableHeader: newValue,
    }, onChangeTitle(newValue));
  }

  onChangeTableFootnote(e, newValue) {
    const { onChangeFootnote } = this.props;

    this.setState({
      tableFootNote: newValue,
    }, onChangeFootnote(newValue));
  }

  onOpenDialog() {
    this.setState({
      isNewColumnDialogOpen: true,
    });
  }

  onCloseDialog() {
    this.setState({
      isNewColumnDialogOpen: false,
    });
  }


  render() {
    const {
      rows, columns, newColumnName, tableHeader, updating, isNewColumnDialogOpen, tableFootNote,
    } = this.state;

    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onClick={this.onCloseDialog}
      />,
      <FlatButton
        label="Submit"
        primary
        keyboardFocused
        onClick={() => { this.onSave(newColumnName); }}
      />,
    ];

    return (
      <div className="editable-table m-3">

        <Snackbar
          open={this.state.deleting === 'columns' || this.state.deleting === 'rows'}
          message={(
            <div>
              {`Select the ${this.state.deleting === 'columns' ? 'column head' : 'row'}. Press Delete & Then Enter.`}
              <FlatButton labelStyle={{ color: '#FFF' }} className="float-right mr-1 ml-3 mt-2" label="Done Deleting" onClick={this.doneDeleting} />
            </div>
          )}
          autoHideDuration={4000}
          onRequestClose={() => { }}
        />

        <TextField fullWidth name="tableTitle" floatingLabelText="Enter table title" value={tableHeader} onChange={this.onChangeTableHeader} />
        <br />
        <br />

        <small style={{ color: 'rgba(0,0,0,0.3)' }}>
          Enter table data
        </small>

        <FlatButton icon={<AddColumnIcon />} primary className="float-right mr-1 " label="Delete Column" onClick={this.deleteColumn} />
        <FlatButton icon={<AddRowIcon />} primary className="float-right mr-1 " label="Delete Row" onClick={this.deleteRow} />
        <FlatButton icon={<AddColumnIcon />} primary className="float-right mr-1 " label="Add Column" onClick={this.onOpenDialog} />
        <FlatButton icon={<AddRowIcon />} primary className="float-right mr-1 " label="Add Row" onClick={this.addRow} />

        {!updating

          && (
          <div>
            <ReactDataGrid
              onCellDeSelected={(v) => {
                if (this.state.deleting) { this.deleteTableData(this.state.deleting, v); } // eslint-disable-line
              }}
              columns={columns}
              enableCellSelect
              rowGetter={this.getRow}
              rowsCount={rows.length}
              minHeight={(35 * rows.length) + 25}
              onGridRowsUpdated={this.onUpdateData}
            />
          </div>
          )
        }

        { updating && (
        <div>
          Updating
        </div>
        )}


        <Dialog
          title="Add new column"
          actions={actions}
          modal={false}
          open={isNewColumnDialogOpen}
          onRequestClose={this.onCloseDialog}
        >
          <TextField
            fullWidth
            floatingLabelText="Enter the name of the new column"
            onChange={this.onChangeColumnName}
            value={newColumnName}
          />
        </Dialog>

        <TextField
          fullWidth
          name="tableFootNote"
          floatingLabelText="Enter footnotes (if any)"
          value={tableFootNote}
          onChange={this.onChangeTableFootnote}
        />

      </div>
    );
  }
}


export default EditableTable;
