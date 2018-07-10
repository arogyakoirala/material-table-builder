import React, { Component } from 'react';
import c3 from 'c3';
// import numeral from 'numeral';
// import { sumBy } from 'lodash';
// import { connect } from 'react-redux';

import './styles.css';


const getChartReadyData = (params, data) => {

  console.log(params)
  const x = params.categorical;
  const y = params.numeric;


  const newData = [];

  data.forEach((item, i) => {
    newData.push({
      name: data[i][x],
      prop: Number(data[i][y]),
    });
  });

  // console.log('chartReadyData', JSON.stringify(newData));
  return newData;
};

class Chart extends Component {
  constructor(props) {
    super(props);
    this.updateChart = this.updateChart.bind(this);
  }

  componentDidMount() {
    console.log('didmountchrt', this.props)
    // console.log('heresmydata',/ this.props.data);
    getChartReadyData(this.props.params, this.props.data);
    this.updateChart('en');
  }

  componentDidUpdate() {
    // this.chart.destroy();
    this.updateChart('en');
  }


  updateChart(localeValue) { //eslint-disable-line
    // console.log('Updating Chart..');
    if (this.props.data) {
      const labels = [];
      getChartReadyData(this.props.params, this.props.data).forEach((item, i) => {
        // console.log('labelitem', item);
        const obj = {};
        obj.value = i;
        obj.text = item.name;
        obj.position = 'start';
        // obj.dy = '-5';
        obj.class = 'label-text';
        labels.push(obj);
      });

      const { data } = this.props;

      data.forEach((item) => {
        item.prop = (item.prop*100).toFixed(1); //eslint-disable-line
      });

      // console.log('chartData', getChartReadyData(this.props.chartParams, this.props.data));

      this.chart = c3.generate({
        bindto: this.node,
        data: {
          json: getChartReadyData(this.props.params, this.props.data),
          colors: {
            prop: '#842e1f',
          },

          labels: {
            format(v, id, i, j) { return id === 'prop' ? `${v}` : ''; },


          },
          classes: {
            prop: 'additional-data1-class',
          },
          keys: {
            x: 'name', // it's possible to specify 'x' when category axis
            value: ['prop'],
          },
          type: 'bar',

        },
        bar: {
          width: {
            ratio: 0.4,
          },
        },
        legend: {
          show: false,
        },
        axis: {
          rotated: true,
          x: {
            show: false,
            type: 'category',
          },
          y: {
            min: -Math.max(...getChartReadyData(this.props.params, this.props.data).map((o) => { return o.prop; })) * 0.4,
            // max: 100,
            show: false,
          },
        },
        grid: {
          x: {
            show: true,
            lines: labels,
          },

          y: {
            lines: [
              { value: 0, text: '' },
            ],
          },
          focus: {
            show: false,

          },
        },
        // tooltip: {
        //   contents(d, defaultTitleFormat, defaultValueFormat, color) {
        //     const { index } = d[0];
        //     const partOne = `<div style="text-transform:none;max-width:200px;text-align:left; background-color: rgba(255,255,255,0.8); padding:5px;border: 1px solid #ccc;">
        //         <b>${getCategoryLabels(localeValue)[data[index].name]}:</b>  ${numeral(data[index].total).format('0,0')} (${data[index].prop}%) `;
        //     const partTwo = '';
        //
        //     const finalToolTip = partOne + partTwo;
        //     return finalToolTip;
        //   },
        // },
      });
    }
  }


  render() {
    const { title } = this.props;
    if (this.props.data) {
      const height = `${4.5 * this.props.data.length}vh`;
      // console.log(height);

      return (
        <div style={{ padding: '10px', backgroundColor: '#ececec' }}>
          <div style={{ marginLeft: '5px', paddingBottom: '10px', fontSize: '1.3rem' }}><b>{title}</b></div>

          <div style={{ backgroundColor: '#fff', padding: '10px' }}>

            <div
        ref={node => this.node = node} //eslint-disable-line
              className={'horizontal-bar-en'}
              style={{ minHeight: height, width: '100%' }}
            />
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

const mapStateToProps = state => (
  {
    locale: state.locale,
  }
);


export default Chart;
