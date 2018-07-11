import React from 'react'; //eslint-disable-line
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import cloneDeep from 'lodash.clonedeep';


import EditableTable from './editable-table';
import SelectChartType from './select-chart';
import Preview from './preview';


class Wizard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeStep: 0,
      data: props.config.data,
      title: props.config.title || '',
      footnote: props.config.footnote || '',
      chartType: 'table',
      chartParams: {},
    };

    this.onChangeData = this.onChangeData.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeFootnote = this.onChangeFootnote.bind(this);
    this.onChangeChartType = this.onChangeChartType.bind(this);
    this.onChangeChartParams = this.onChangeChartParams.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }


  onChangeData(updatedData) {
    this.setState({ data: updatedData });
    // setTimeout(() => {
    // }, 10);
  }

  onChangeTitle(newTitle) {
    this.setState({
      title: newTitle,
    });
  }


  onChangeFootnote(newFootnote) {
    this.setState({
      footnote: newFootnote,
    });
  }


  onChangeChartType(v) {
    this.setState({
      chartType: v,
    });
  }

  onChangeChartParams(newParams) {
    this.setState({ chartParams: newParams });
  }

  onSubmit() {
    const {
      title, data, footnote, chartParams, chartType,
    } = this.state;

    const { onSubmit } = this.props;

    // remove additional object with column names if exists.
    const dataCopy = cloneDeep(data);
    const keys = Object.keys(data[0]);
    const finalData = data[0][keys[0]] === keys[0] ? dataCopy.splice(1, data.length) : dataCopy;

    const submissionData = {
      title,
      data: finalData,
      footnote,
      params: chartParams.params,
      chartType,
    };

    onSubmit(submissionData);
  }


  renderStepperControls() {
    const { activeStep } = this.state;
    return (
      <div style={{ marginTop: 12 }} className="float-right">
        <FlatButton
          label="Back"
          disabled={activeStep === 0}
          onClick={() => { this.setState({ activeStep: activeStep - 1 }); }}
          style={{ marginRight: 12 }}
        />

        { activeStep !== 2
          && (
          <RaisedButton
            label="Next"
            disabled={false}
            onClick={() => { this.setState({ activeStep: activeStep + 1 }); }}
            primary
          />
          )}

        { activeStep === 2
        && (
        <RaisedButton
          label="Submit Chart"
          disabled={false}
          onClick={() => { console.log('clickes'); this.onSubmit(); }}
          primary
        />
        )}
      </div>
    );
  }


  render() {
    const {
      data, title, footnote, activeStep, chartType, chartParams,
    } = this.state;

    return (
      <div>
        <Stepper linear={false} activeStep={activeStep} orientation="vertical">
          <Step>
            <StepLabel>
              Add Data
            </StepLabel>
            <StepContent>
              <p>
                Please start by providing data for the table and/or graph.
                {' '}
                <br />
                We have populated a default table for you, but feel free to modify any content within the table, or add/update new rows and columns.
              </p>

              <EditableTable
                onChangeTitle={this.onChangeTitle}
                onChangeFootnote={this.onChangeFootnote}
                onChangeData={this.onChangeData}
                data={data}
                title={title}
                footnote={footnote}
              />

              {this.renderStepperControls()}
            </StepContent>
          </Step>

          <Step>
            <StepLabel>
              Select type of rendering
            </StepLabel>
            <StepContent>
              <p>
                Please select how you would want to display this information.
              </p>
              <SelectChartType
                onChangeChartParams={this.onChangeChartParams}
                onChangeChartType={this.onChangeChartType}
                chartType={chartType}
                tableName={title}
                data={data}
              />
              {this.renderStepperControls()}
            </StepContent>
          </Step>

          <Step>
            <StepLabel>
              Preview results
            </StepLabel>
            <StepContent>
              <Preview
                chartParams={chartParams}
                data={data}
                title={title}
                footnote={footnote}
                chartType={chartType}
              />
              {this.renderStepperControls()}
            </StepContent>
          </Step>

        </Stepper>

      </div>
    );
  }
}

export default Wizard;
