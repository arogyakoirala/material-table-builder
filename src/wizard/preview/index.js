import React, { Component } from 'react';
import cloneDeep from 'lodash.clonedeep';
import RenderTable from '../../table';
import RenderChart from '../../chart';

// import './styles.scss';


class Preview extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { chartType, data, chartParams } = this.props;
    console.log('chartParamsinPreview', chartParams.params);


    const dataCopy = cloneDeep(data);
    const keys = Object.keys(data[0]);
    const finalData = data[0][keys[0]] === keys[0] ? dataCopy.splice(1, data.length) : dataCopy;

    console.log('finalData',finalData)
    // const finalChartData = getChartReadyData(chartParams, data);
    return (
      <div>
        {chartType === 'table' && <RenderTable data={finalData} title={this.props.tableName} updating={this.props.updating} />}
        {chartType === 'chart' && <RenderChart params={chartParams.params} title={this.props.tableName} data={finalData} />}
      </div>
    );
  }
}

export default Preview;
