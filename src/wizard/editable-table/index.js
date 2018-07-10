import React, { Component } from 'react';
import ReactDataGrid from 'react-data-grid';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SvgIcon from 'material-ui/SvgIcon';
import { generateRows, generateColumns } from './utils';
import './styles.css'; //eslint-disable-line

// import BarChart from '../charts/bar';
//
// const rowsDummy = [
//   {
//     Column1: '-',
//     Column2: '-',
//   },
//   {
//     Column1: '-',
//     Column2: '-',
//   },
// ];


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

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isNewColumnDialogOpen: false,
      rows: generateRows(props.data),
      columns: generateColumns(props.data),
      updating: false,
      newColumnName: '',
      tableHeader: props.title,
      tableFootnote: props.footnote,
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
  }

  getRow(i) {
    return this.state.rows[i];
  }

  componentDidMount() {
    // console.log('initialRows', this.state.rows);
  }

  onUpdateData({ fromRow, fromRowData, updated }) { //eslint-disable-line

    const newObject = { ...fromRowData, ...updated };
    const rowsCopy = this.state.rows;
    rowsCopy[fromRow] = newObject;
    let array = []
    if (fromRow === 0) {
      const oldColumnName = Object.keys(updated)[0];
      const newColumnName = updated[Object.keys(updated)[0]];

      const oldKeysCopy = Object.keys(rowsCopy[0])


      // const array = [];

      rowsCopy.forEach((item)=>{
        const obj = {}
        Object.keys(item).forEach((ita)=> {
          if (ita !== oldColumnName) {
            obj[ita] = item[ita];
          } else {
            obj[newColumnName] = item[ita]
          }
        })
        array.push(obj)
      })
    } else {
      array = rowsCopy
    }

    // console.log('prposedUpdate', [...rowsCopy]);
    this.setState({
      rows: generateRows([...array].splice(1, rowsCopy.length)),
      columns: generateColumns([...array].splice(1, rowsCopy.length)),
    }, () => {
      // console.log('newRows', rowsCopy);
    });

    this.props.onChangeData(rowsCopy.splice(1, rowsCopy.length));
  }

  addRow() {
    this.setState({
      updating: true,
    });

    const newRow = {};
    const oldRows = this.state.rows;
    this.state.columns.forEach((item) => {
      newRow[item.key] = '';
    });

    newRow.id = oldRows.length + 1;


    oldRows.push(newRow);

    setTimeout(() => {
      this.setState({
        updating: false,
        rows: oldRows,
      }, this.props.onChangeData(oldRows));
    }, 100);
  }

  addColumn(newColumnName) {
    this.setState({
      updating: true,
    });

    // const newColumnName = `newrow${Math.random().toFixed(3)}`;

    const currentColumns = this.state.columns;
    const currentRows = this.state.rows;

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
      }, this.props.onChangeData(currentRows));
    }, 100);
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
    this.setState({
      tableHeader: newValue,
    }, this.props.onChangeTableName(newValue));
  }

  onChangeTableFootnote(e, newValue) {
    this.setState({
      tableFootNote: newValue,
    }, this.props.onChangeTableFootnote(newValue));
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
    const { rows, columns } = this.state;

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
        onClick={() => { this.onSave(this.state.newColumnName); }}
      />,
    ];

    return (
      <div className="editable-table m-3">
        <TextField fullWidth name="tableTitle" floatingLabelText="Enter table title" value={this.state.tableHeader} onChange={this.onChangeTableHeader} />
        <br />
        <br />

        <small style={{ color: 'rgba(0,0,0,0.3)' }}>Enter table data</small>
        <FlatButton icon={<AddColumnIcon />} primary className="float-right mr-1 " label="Add Column" onClick={this.onOpenDialog} />
        <FlatButton icon={<AddRowIcon />} primary className="float-right mr-1 " label="Add Row" onClick={this.addRow} />

        {!this.state.updating &&

          <div>
          <ReactDataGrid
            columns={columns}
            enableCellSelect
            rowGetter={this.getRow}
            rowsCount={rows.length}
            minHeight={(35 * rows.length) + 15}
            onGridRowsUpdated={this.onUpdateData}
          />
          </div>
        }

        {this.state.updating && <div>Updating</div>}


        <Dialog
          title="Add new column"
          actions={actions}
          modal={false}
          open={this.state.isNewColumnDialogOpen}
          onRequestClose={this.onCloseDialog}
        >
          <TextField fullWidth floatingLabelText="Enter the name of the new column" onChange={this.onChangeColumnName} value={this.state.newColumnName} />
        </Dialog>

        <TextField fullWidth name="tableFootNote" floatingLabelText="Enter footnotes (if any)" value={this.state.tableFootnote} onChange={this.onChangeTableFootnote} />

        {/* <FlatButton className="mr-3 mb-3" primary label="Save Changes" onClick={this.onSave} /> */}
      </div>
    );
  }
}


export default Home;
