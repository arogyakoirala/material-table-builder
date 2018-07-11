import React, { Component } from 'react'; //eslint-disable-line
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

// import './styles.scss';

class RenderTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.getColumnHeaders = this.getColumnHeaders.bind(this);
  }

  getColumnHeaders(data) { //eslint-disable-line
    return Object.keys(data[0]);
  }

  render() {
    const {
      data, title, updating, footnote,
    } = this.props;

    const columnHeaders = this.getColumnHeaders(data);

    if (updating) {
      return <div />;
    } else {
      return (
        <div style={{ backgroundColor: '#ececec', padding: '10px' }}>
          <div style={{ marginLeft: '5px', paddingBottom: '10px', fontSize: '1.3rem' }}>
            <b>
              {title}
            </b>
          </div>
          <Table selectable={false}>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                {columnHeaders.map((item) => {
                  return (
                    <TableHeaderColumn key={Math.random()}>
                      {item}
                    </TableHeaderColumn>
                  );
                })}
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {data.map((item) => {
                return (
                  <TableRow key={Math.random() * 10}>
                    {columnHeaders.map((columnName) => {
                      return (
                        <TableRowColumn key={Math.random() * 100}>
                          {item[columnName]}
                        </TableRowColumn>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <div style={{
            marginLeft: '5px', paddingBottom: '5px', paddingTop: '10px', color: '#666',
          }}
          >
            {footnote}
          </div>
        </div>
      );
    }
  }
}

export default RenderTable;
