import React, { Component } from 'react';

class Worth extends Component{
  render(){

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

    const thisRatio = thisState.populationRatio;

    const worthMore = this.props.data.filter((a) => {
      return a.populationRatio > thisRatio;
    }).map((a) => {
      return a.population;
    }).reduce((a,b) => { return a+b; }, 0).toLocaleString();

    const statesWorthMore = this.props.data.filter((a) => {
      return a.populationRatio > thisRatio;
    }).length;

    const worthLess = this.props.data.filter((a) => {
      return a.populationRatio < thisRatio;
    }).map((a) => {
      return a.population;
    }).reduce((a,b) => { return a+b; }, 0).toLocaleString();

    const statesWorthLess = this.props.data.filter((a) => {
      return a.populationRatio < thisRatio;
    }).length;

    console.log(thisRatio);
    return(
      <div>
        <dl>
          <dt>In {year}, a vote in {state} was worth...</dt>
          <dd>Less that the votes of {worthMore} Americans in {statesWorthMore} states</dd>
          <dd>More that the votes of {worthLess} Americans in {statesWorthLess} states</dd>
        </dl>
      </div>
    )
  }
}

export default Worth;
