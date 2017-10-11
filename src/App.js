import React, { Component } from 'react';
import parse from 'csv-parse';

import './normalize.css';
import './skeleton.css';

import csv2008 from './data/2008.csv';
import csv2012 from './data/2012.csv';
import csv2016 from './data/2016.csv';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      data2008: undefined,
      data2012: undefined,
      data2016: undefined,
    }

    parse(csv2008, (err, output) => {
      this.parseCSV(err, output, 2008)
    })
    parse(csv2012, (err, output) => {
      this.parseCSV(err, output, 2012)
    })
    parse(csv2016, (err, output) => {
      this.parseCSV(err, output, 2016)
    })
  }

  parseCSV = (err, output, year) => {
    const data = output.map((item) => {
      return {
        'state': item[0],
        'votes': item[1],
        'turnout': item[2],
        'population': item[3]
      }
    });
    const newState = {};
    newState[year] = data;

    this.setState(newState);
  }

  render() {
    return (
      <div className="container">
        <h1>What is my vote worth?</h1>
        <h3>2016</h3>
        <p>{this.state.data2016}</p>
        <h3>2012</h3>
        <p>{this.state.data2012}</p>
        <h3>2008</h3>
        <p>{this.state.data2008}</p>
      </div>
    );
  }
}

export default App;
