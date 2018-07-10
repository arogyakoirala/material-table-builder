import React from 'react';
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import cloneDeep from 'lodash.clonedeep';


import EditableTable from './editable-table'
import SelectChartType from './select-chart'
import Preview from './preview'



const Test = () => (
    <h1>Hello from My Component</h1>
);


class Wizard extends React.Component {
  constructor(props) {
    super(props)

    this.state  = {
      activeStep: 0,
      data: props.config.data,
      title: props.config.title || "",
      footnote: props.config.footnote || "",
      updatingTable:false,
      chartType: 'table',
            chartParams: {},
    }
    this.onChangeTableData = this.onChangeTableData.bind(this);
    this.onChangeTableName = this.onChangeTableName.bind(this);
    this.onChangeChartType = this.onChangeChartType.bind(this);
    this.onChangeChartParam = this.onChangeChartParam.bind(this);
  }


  onChangeTableData(updatedData) {
    console.log('changedTableData', updatedData);
    this.setState({
      updatingTable: false,
    });


    setTimeout(() => {
      this.setState({ updatingTable: false, data: updatedData });
    }, 10);
  }


  onChangeTableName(newName) {
     console.log('updatedData', newName);
     this.setState({
       title: newName,
     });
   }

   onChangeTableFootnote(newName) {
      console.log('updatedData', newName);
      this.setState({
        footnote: newName,
      });
    }


    onChangeChartParam(chartParams) {
      this.setState({ chartParams });
    }
    onChangeChartType(v) {
      this.setState({
        chartType: v,
      });
    }



  submitChartData() {

      const dataCopy = cloneDeep(this.state.data);
      const keys = Object.keys(this.state.data[0]);
      const finalData = this.state.data[0][keys[0]] === keys[0] ? dataCopy.splice(1, data.length) : dataCopy;

      const submissionData = {
        title: this.state.title,
        data:this.state.data,
        footnote: this.state.footnote,
        params: this.state.chartParams.params,
      }

      this.props.onSubmit(submissionData);

  }


  renderStepperControls() {
    return (
      <div style={{ marginTop: 12 }} className="float-right">
        <FlatButton
          label="Back"
          disabled={this.state.activeStep === 0}
          onClick={() => { this.setState({ activeStep: this.state.activeStep - 1 }); }}
          style={{ marginRight: 12 }}
        />
        {this.state.activeStep !== 2 &&
          <RaisedButton
            label="Next"
            disabled={false}
            onClick={() => { this.setState({ activeStep: this.state.activeStep + 1 }); }}
            primary
          />}

        {this.state.activeStep === 2 &&
        <RaisedButton
          label="Submit Chart"
          disabled={false}
          onClick={() => { console.log('clickes'); this.submitChartData(); }}
          primary
        />}
      </div>
    );
  }



  render() {
    return (
      <div>
      <Stepper linear={false} activeStep={this.state.activeStep} orientation="vertical">
        <Step>
          <StepLabel>Add Data</StepLabel>
          <StepContent>
            <p>
          Please start by providing data for the table and/or graph.
          We have populated a default table for you, but feel free to modify any content within the table, or add/update new rows and columns.
            </p>

            <EditableTable  onChangeTableName={this.onChangeTableName} onChangeTableFootnote={this.onChangeTableFootnote} onChangeData={this.onChangeTableData} data={this.state.data} title={this.state.title} footnote={this.state.footnote}/>
            {this.renderStepperControls()}
          </StepContent>
        </Step>
        <Step>
          <StepLabel>
          Select type of rendering
          </StepLabel>
          <StepContent>
            <p>Please select how you would want to display this information.</p>
            <SelectChartType
  onChartParamChange={this.onChangeChartParam}
  onChange={this.onChangeChartType}
  chartType={this.state.chartType}
  tableName={this.state.title}
  updating={this.state.updating}
  data={this.state.data}
/>


            {this.renderStepperControls()}
          </StepContent>
        </Step>
        <Step>
          <StepLabel>
          Preview results
          </StepLabel>
          <StepContent>
          <Preview chartParams={this.state.chartParams} data={this.state.data} tableName={this.state.title} chartType={this.state.chartType} updating={this.state.updating} />


          {this.renderStepperControls()}

          </StepContent>
        </Step>
      </Stepper>


      </div>
    )
  }
}

export default Wizard;
