import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import parse from 'csv-parse';

import RawDataTable from './pages/RawDataTable';
import Home from './pages/Home';
import Resources from './pages/Resources';
import WorthForm from './components/WorthForm';
import Worth from './components/Worth';

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
    let data = output.slice(1).map((item) => {
      return {
        'state': item[0],
        'votes': item[1],
        'turnout': item[2],
        'population': item[3],
        'turnoutRatio': (item[1]/item[2]),
        'populationRatio': (item[1]/item[3]),
      }
    });
    const minTurnoutRatio = data.reduce((accumulator, currentValue) => {
      if(currentValue.turnoutRatio < accumulator){
        return currentValue.turnoutRatio;
      }else{
        return accumulator;
      }
    }, Infinity);
    const minPopulationRatio = data.reduce((accumulator, currentValue) => {
      if(currentValue.populationRatio < accumulator){
        return currentValue.populationRatio;
      }else{
        return accumulator;
      }
    }, Infinity);

    data = data.map((item) => {
      return {
        'state': item.state,
        'votes': Number(item.votes),
        'turnout': Number(item.turnout),
        'population': Number(item.population),
        'turnoutRatio': (item.turnoutRatio/minTurnoutRatio),
        'populationRatio': (item.populationRatio/minPopulationRatio),
      };
    });

    const newState = {};
    newState['data' + year] = data;

    this.setState(newState);
  }

  render() {
    return (
      <Router>
        <div className="container">
          <br />
          <h2>What is my vote worth?</h2>
          <Link to="/">About</Link>&nbsp;|&nbsp;
          <Link to="/worth">Calculate My Vote's Worth</Link>&nbsp;|&nbsp;
          <Link to="/resources">Resources</Link>
          <hr />
          <Route exact path="/" component={Home}/>
          <Route path="/worth/:state/:year" render={(props) => (
            <Worth data={this.state['data' + props.match.params.year]} {...props}/>
          )} />
          <Route path="/worth" component={WorthForm} />
          <Route path="/resources" component={Resources} />
          <Route path="/raw/2008" render={() => (
            <div>
              <h4>2008</h4>
              <RawDataTable table={this.state.data2008} />
            </div>
          )} />
          <Route path="/raw/2012" render={() => (
            <div>
              <h4>2012</h4>
              <RawDataTable table={this.state.data2012} />
            </div>
          )} />
          <Route path="/raw/2016" render={() => (
            <div>
              <h4>2016</h4>
              <RawDataTable table={this.state.data2016} />
            </div>
          )} />
        </div>
      </Router>
    );
  }
}

export default App;
