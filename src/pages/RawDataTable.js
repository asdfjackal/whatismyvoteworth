import React, { Component } from 'react';

class RawDataTable extends Component{
  constructor(props){
    super(props);
    this.state = {
      'show': true,
      'sortKey': 'votes',
      'sortAscending': true,
    }
  }

  toggle = (event) => {
    event.preventDefault();
    const newState = !this.state.show;
    this.setState({'show':newState});
  };

  sortTable = (event) => {
    event.preventDefault();
    const currentKey = this.state.sortKey;
    const currentOrder = this.state.sortAscending;
    if(event.target.id !== currentKey){
      this.setState({
        'sortKey': event.target.id,
        'sortAscending': true,
      });
    }else{
      this.setState({
        'sortAscending': !currentOrder,
      })
    }
  };

  render(){
    if(!this.props.table){
      return (
        <p>Loading...</p>
      );
    }
    const rows = this.props.table.sort((a, b) => {
      const diff = a[this.state.sortKey] - b[this.state.sortKey];
      return this.state.sortAscending ? diff : -diff;
    }).map((item) => {
      return (
        <tr>
          <td>{item.state}</td>
          <td>{item.votes}</td>
          <td>{item.turnout}</td>
          <td>{item.population}</td>
          <td>{item.turnoutRatio.toFixed(2)}</td>
          <td>{item.populationRatio.toFixed(2)}</td>
        </tr>
      );
    });
    return (
      <div className="u-full-width">
        <a onClick={this.toggle}>Show/Hide</a>
        {
          this.state.show ?
          (
            <table className="u-full-width">
              <thead>
                <tr>
                  <th>State</th>
                  <th><a id='votes' onClick={this.sortTable}>Electoral Votes</a></th>
                  <th><a id='turnout' onClick={this.sortTable}>Turnout</a></th>
                  <th><a id='population' onClick={this.sortTable}>Population</a></th>
                  <th><a id='turnoutRatio' onClick={this.sortTable}>Turnout Ratio</a></th>
                  <th><a id='populationRatio' onClick={this.sortTable}>Population Ratio</a></th>
                </tr>
              </thead>
              <tbody>
                {rows}
              </tbody>
            </table>
          ):
          null
        }
      </div>
    );
  }
}

export default RawDataTable;
