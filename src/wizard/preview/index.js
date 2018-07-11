import React, { Component } from 'react'; // eslint-disable-line
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
    const {
      chartType, data, chartParams, title, footnote,
    } = this.props;

    // remove additional object with column names if exists.
    const dataCopy = cloneDeep(data);
    const keys = Object.keys(data[0]);
    const finalData = data[0][keys[0]] === keys[0] ? dataCopy.splice(1, data.length) : dataCopy;

    return (
      <div>
        {chartType === 'table' && <RenderTable data={finalData} title={title} footnote={footnote} />}
        {chartType === 'chart' && <RenderChart params={chartParams.params} title={title} data={finalData} footnote={footnote} />}
      </div>
    );
  }
}

export default Preview;
