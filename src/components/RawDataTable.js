import React, { Component } from 'react';

class RawDataTable extends Component{
  constructor(props){
    super(props);
    this.state = {
      'show': false,
    }
  }

  toggle = (event) => {
    event.preventDefault();
    const newState = !this.state.show;
    this.setState({'show':newState});
  };

  render(){
    if(!this.props.table){
      return (
        <p>Loading...</p>
      );
    }
    const rows = this.props.table.map((item) => {
      return (
        <tr>
          <td>{item.state}</td>
          <td>{item.votes}</td>
          <td>{item.turnout}</td>
          <td>{item.population}</td>
        </tr>
      );
    });
    return (
      <div>
        <a onClick={this.toggle}>Show/Hide</a>
        {
          this.state.show ?
          (            
            <table class="u-full-width">
              <thead>
                <tr>
                  <th>State</th>
                  <th>Electoral Votes</th>
                  <th>Turnout</th>
                  <th>Population</th>
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
