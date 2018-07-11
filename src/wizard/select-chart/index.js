import React, { Component } from 'react'; //eslint-disable-line
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


const arraysEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) { return false; }
  for (let i = arr1.length; i -= 1;) { //eslint-disable-line
    if (arr1[i] !== arr2[i]) { return false; }
  }

  return true;
};
// import './styles.scss';
const styles = {
  block: {
    maxWidth: 250,
  },
  radioButton: {
    // marginBottom: 16,
  },
};

class SelectChartType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedChartType: props.chartType,
      numericColumns: [],
      categoricalColumns: [],
    };

    this.onSelectionChange = this.onSelectionChange.bind(this);
  }

  componentDidMount() {
    const { data } = this.props;

    this.getColumnsByType(data);
  }

  componentDidUpdate(prevProps, prevState) {
    const { data } = this.props;
    const isThereChange = !arraysEqual(Object.keys(data[0]), Object.keys(prevProps.data[0]));
    // console.log('istherechange', isThereChange);
    if (isThereChange) {
      this.getColumnsByType(data);
    }
  }


  onChartParamChange(type, value) {
    const {
      categoricalColumns, numericColumns, categoricalColumnValue, numericColumnValue,
    } = this.state;

    const { onChangeChartParams } = this.props;

    switch (type) {
      case 'categorical':
        this.setState({
          categoricalColumnValue: categoricalColumns[value],
        }, onChangeChartParams({ params: { categorical: categoricalColumns[value], numeric: numericColumnValue } }));
        break;
      case 'numeric':
        this.setState({
          numericColumnValue: numericColumns[value],
        }, onChangeChartParams({ params: { categorical: categoricalColumnValue, numeric: numericColumns[value] } }));
        break;
      default:
        break;
    }
  }

  checkForDisabled(data) { //eslint-disable-line
    // console.log('initialData', data);
    const keys = Object.keys(data[0]);
    // console.log(keys);

    const stats = {};
    keys.forEach((key) => {
      stats[key] = 0;
    });

    data.forEach((item) => {
      keys.forEach((key) => {
        // console.log(item[key]);
        if (!isNaN(item[key])) { //eslint-disable-line
          stats[key] += 1;
        }
      });
    });

    const numericColumns = [];
    const categoricalColumns = [];

    keys.forEach((key) => {
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

  getColumnsByType(data) {
    const { onChangeChartParams } = this.props;

    const keys = Object.keys(data[0]);
    // console.log(keys);

    const stats = {};
    keys.forEach((key) => {
      stats[key] = 0;
    });

    data.forEach((item) => {
      keys.forEach((key) => {
        // console.log(item[key]);
        if (!isNaN(item[key])) { //eslint-disable-line
          stats[key] += 1;
        }
      });
    });

    const numericColumns = [];
    const categoricalColumns = [];

    keys.forEach((key) => {
      if (stats[key] === data.length) {
        numericColumns.push(key);
      } else {
        categoricalColumns.push(key);
      }
    });

    this.setState({
      numericColumns,
      categoricalColumns,
      numericColumnValue: numericColumns[0],
      categoricalColumnValue: categoricalColumns[0],
    });

    onChangeChartParams({ params: { categorical: categoricalColumns[0], numeric: numericColumns[0] } });
  }

  onSelectionChange(e, v) {
    const { onChangeChartType } = this.props;
    // console.log(v);
    this.setState({
      selectedChartType: v,
    }, onChangeChartType(v));
  }

  render() {
    const {
      selectedChartType, categoricalColumns, categoricalColumnValue, numericColumns, numericColumnValue,
    } = this.state;
    const { data } = this.props;

    return (
      <div>

        <RadioButtonGroup onChange={this.onSelectionChange} name="shipSpeed" defaultSelected={selectedChartType}>
          <RadioButton
            value="table"
            label="Display as a table"
            style={styles.radioButton}
          />
          <RadioButton
            value="chart"
            disabled={this.checkForDisabled(data)}
            label={this.checkForDisabled(data) ? 'Display as a bar chart (disabled; make sure the table contains at least one column with only numeric values)' : 'Display as a bar chart'}
            style={styles.radioButton}
          />
        </RadioButtonGroup>

        {selectedChartType === 'chart'
        && (
        <div style={{ marginLeft: '40px', backgroundColor: '#f2f2f2', padding: '10px' }}>
          <p>
            <b>
              Specify chart parameters
            </b>
          </p>
          <div style={{ backgroundColor: '#fff', padding: '10px' }}>
            <div className="row">
              <div className="col-6">
                <SelectField
                  onChange={(e, nv) => { this.onChartParamChange('categorical', nv); }}
                  fullWidth
                  value={categoricalColumnValue}
                  floatingLabelText="Select X-axis (categorical axis)"
                >
                  { categoricalColumns.map((item) => {
                    return <MenuItem key={Math.random()} primaryText={item} value={item} />;
                  })
                }
                </SelectField>
              </div>
              <div className="col-6">
                <SelectField
                  onChange={(e, nv) => { this.onChartParamChange('numeric', nv); }}
                  fullWidth
                  value={numericColumnValue}
                  floatingLabelText="Select Y-axis (numeric axis)"
                >
                  {
                    numericColumns.map((item) => {
                      return <MenuItem key={Math.random()} primaryText={item} value={item} />;
                    })
                  }
                </SelectField>
              </div>
            </div>
          </div>

        </div>
        )
      }
      </div>
    );
  }
}

export default SelectChartType;
