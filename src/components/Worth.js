import React, { Component } from 'react';

class Worth extends Component{
  render(){

    const voterKey = 'turnout';
    const voterRatioKey = voterKey + 'Ratio';

    const {state, year} = this.props.match.params;

    if(this.props.data === undefined){
      return(
        <div>Calculating...</div>
      )
    }
    console.log(this.props.data);

    const thisState = this.props.data.filter((a) => {
      return a.state === state;
    })[0];

    if(thisState === undefined){
      return(
        <div>Provided State Does Not Exist</div>
      );
    }

    const thisRatio = thisState[voterRatioKey];

    const worthMore = this.props.data.filter((a) => {
      return a[voterRatioKey] > thisRatio;
    }).map((a) => {
      return a[voterKey];
    }).reduce((a,b) => { return a+b; }, 0).toLocaleString();

    const statesWorthMore = this.props.data.filter((a) => {
      return a[voterRatioKey] > thisRatio;
    }).length;

    const worthLess = this.props.data.filter((a) => {
      return a[voterRatioKey] < thisRatio;
    }).map((a) => {
      return a[voterKey];
    }).reduce((a,b) => { return a+b; }, 0).toLocaleString();

    const statesWorthLess = this.props.data.filter((a) => {
      return a[voterRatioKey] < thisRatio;
    }).length;

    const sortedList = this.props.data.sort((a,b) => {
      return a[voterRatioKey] - b[voterRatioKey];
    });

    const mostState = sortedList[sortedList.length -1];
    const leastState = sortedList[0];

    const mostRatio = (mostState[voterRatioKey]/thisState[voterRatioKey]).toFixed(2);
    const leastRatio = (thisState[voterRatioKey]/leastState[voterRatioKey]).toFixed(2);

    return(
      <div>
        <dl>
          <dt>In {year}, a vote in {state} was worth...</dt>
          <dd>Less that the votes of {worthMore} Americans in {statesWorthMore} states</dd>
          <dd>More that the votes of {worthLess} Americans in {statesWorthLess} states</dd>
        </dl>

        <dl>
          <dt>In {year}...</dt>
          <dd>A vote in {mostState.state} meant the most, having {mostRatio} times more influence than a vote in {state}</dd>
          <dd>A vote in {leastState.state} meant the least, having {leastRatio} times less influence than a vote in {state}</dd>
        </dl>
        <hr />
      </div>
    )
  }
}

export default Worth;
