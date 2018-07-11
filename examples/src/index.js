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

          <h1>
Material Table Builder
          </h1>


          <hr />
          <p>
A simple wizard that allows users to build tables/graphs for use else-where in a Material-UI based React project.
          </p>
          <br />

          <h4>
Usage
          </h4>
          <hr />

          <p>
The
            {' '}
            <code>
Wizard
            </code>
            {' '}
component is the default export of this module, and will take the following two props:
            <ul>
              <li>
A
                <b>
                  {' '}
config
                </b>
                {' '}
object, through which we can pass configurations parameters for the wizard such as dummy data, a title, and a footnotes. The wizard will then look into the data object to create a dummy table which can then be modified.
              </li>
              <li>
                <b>
onSubmit()
                </b>
                {' '}
handler can be used to access the final data after submission through the chart builder.

              </li>
            </ul>
            {' '}
            <br />
            {' '}
          </p>

          <h4>
Working Example
          </h4>
          <hr />

          <div className="demo" style={{ border: '1px solid #ececec', padding: '2rem', marginBottom: '1rem' }}>
            <Wizard config={config} onSubmit={this.onSubmit} />
          </div>

          <div className="code" style={{ border: '1px solid #ececec', padding: '2rem', marginBottom: '1rem' }}>

            <pre>

              <code className="js">
                {`
	import React, {Component} from 'react';
	import Wizard from 'material-table-builder';

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

	class App extends Component {
		constructor(props) {
			super(props);
			this.state = {};
		}

		onSubmit(data) {
			console.log(JSON.stringify(data));
		}

		render() {
			return (
				<Wizard config={config} onSubmit={this.onSubmit} />
			);
		}
	}

	export default App;
					`}
              </code>
            </pre>
          </div>
          <h4>
					Other helper components

          </h4>
          <hr />

          <p>
            {' '}
The package also comes with two additional helper components, viz.
            {' '}
            <code>
 Chart
            </code>
            {' '}
and
            {' '}
            <code>
Table
            </code>
            {' '}
to render charts and/or tables elsewhere in the site using the configuration object provided by the
            <code>
              {' '}
Wizard
            </code>
            {' '}
component. Shown below are two examples of the same. Please note that since this is for illustrative purposes I have not used the
            {' '}
            <code>
chartType
            </code>
            {' '}
prop. To keep things more convenient, you could easily create a higher level component that renders a chart or a table based on the
            {' '}
            <code>
chartType
            </code>
            {' '}
prop.
          </p>

          <h5>
Chart Component
          </h5>
          <hr />
          <div className="demo" style={{ border: '1px solid #ececec', padding: '2rem', marginBottom: '1rem' }}>


            <Chart data={tableChartDummy.data} title={tableChartDummy.title} params={tableChartDummy.params} footnote={tableChartDummy.footnote} />
          </div>
          <br />
          <div className="code" style={{ border: '1px solid #ececec', padding: '2rem', marginBottom: '1rem' }}>

            <pre>
              <code className="js">
                {`
	import React, {Component} from 'react';
	import { Chart } from 'material-table-builder';

	const dummyData = {
		chartType: 'chart',
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

	class App extends Component {
		constructor(props) {
			super(props);
			this.state = {};
		}

		render() {
			return (
				<Chart
					data={dummyData.data}
					title={dummyData.title}
					params={dummyData.params}
					footnote={dummyData.footnote}
				/>
			);
		}
	}

	export default App;

					`}
              </code>
            </pre>
          </div>

          <h5>
Table Component
          </h5>
          <hr />
          <div className="demo" style={{ border: '1px solid #ececec', padding: '2rem', marginBottom: '1rem' }}>


            <Table data={tableChartDummy.data} title={tableChartDummy.title} params={tableChartDummy.params} footnote={tableChartDummy.footnote} />
          </div>
          <br />
          <div className="code" style={{ border: '1px solid #ececec', padding: '2rem', marginBottom: '1rem' }}>

            <pre>
              <code className="js">
                {`
	import React, {Component} from 'react';
	import { Table } from 'material-table-builder';

	const dummyData = {
		chartType: 'table',
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

	class App extends Component {
		constructor(props) {
			super(props);
			this.state = {};
		}

		render() {
			return (
				<Table
					data={dummyData.data}
					title={dummyData.title}
					params={dummyData.params}
					footnote={dummyData.footnote}
				/>
			);
		}
	}

	export default App;

					`}
              </code>
            </pre>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

render(<App />, document.getElementById('root'));
