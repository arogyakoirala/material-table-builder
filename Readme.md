# material-table-builder

A simple wizard that allows users to build tables/graphs for use else-where in a material based react project.

## Background

The need for a charting component originated when we were working for the Open Local Governance Digital System here at KLL. Users from different municipalities wanted the functionality to input their own data for the profile section of the website.

To learn more about OLGDS you can visit [this link](http://csmap.klldev.org/test%201/2018/06/01/Open-Local-Government-Digital-System.html).

## Demo

A working demo of the module, along with the code can be found in [this link.](https://arkoblog.github.io/material-table-builder/)


## Usage

The Wizard component is the default export of this module, and will take the following two props:

- A config object, through which we can pass configurations parameters for the wizard such as dummy data, a title, and a footnotes. The wizard will then look into the data object to create a dummy table which can then be modified.
- onSubmit() handler can be used to access the final data after submission through the chart builder.

```
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

```

### Additional helper components

The package also comes with two additional helper components, viz. `Chart` and `Table` to render charts and/or tables elsewhere in the site using the configuration object provided by the Wizard component. Shown below are two examples of the same. Please note that since this code example is illustrative purposes I haven't used the `chartType` prop. To keep things more convenient, you could easily create a higher level component that renders a chart or a table based on the value of this prop.

#### Chart

```

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

```

#### Table

```
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
```
