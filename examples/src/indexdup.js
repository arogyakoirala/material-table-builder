import React from 'react'; //eslint-disable-line
import { render} from 'react-dom'; //eslint-disable-line
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Wizard, { Table, Chart } from '../../src';

const tableChartDummy = {
  title: 'Dummy Title',
  data: [{
    sn: '1',
    name: 'John Doe',
    numberOfSocks: 46,
  },
  {
    sn: '2',
    name: 'Jane Doe',
    numberOfSocks: 67,
  },
  ],
  footnote: 'Data collected during the annual John & Jane Sock Fair, 2015.',
  params: {
    categorical: 'name',
    numeric: 'sn',
  },
};

const config = {
  title: 'Dummy Title',
  data: [
    {
      sn: '1',
      name: 'John Doe',
      numberOfSocks: 46,
    },
    {
      sn: '2',
      name: 'Jane Doe',
      numberOfSocks: 67,
    },
  ],
  footnote: 'Data collected during the annual John & Jane Sock Fair, 2015.',
};

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#842e1f',
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onSubmit(data) {
    console.log(JSON.stringify(data));
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="container py-5">

          <Wizard config={config} onSubmit={this.onSubmit} />
          <Chart data={tableChartDummy.data} title={tableChartDummy.title} params={tableChartDummy.params} />
          <Table data={tableChartDummy.data} title={tableChartDummy.title} params={tableChartDummy.params} />
        </div>
      </MuiThemeProvider>
    );
  }
}

render(<App />, document.getElementById('root'));
