import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Resources extends Component{
  render(){
    return (
      <div>
        <h5>Resources</h5>
          <dl>
            <dt>Raw data from Presidential Election in...</dt>
            <dd>
              <ul>
                <li><Link to='/raw/2008'>2008</Link></li>
                <li><Link to='/raw/2012'>2012</Link></li>
                <li><Link to='/raw/2016'>2016</Link></li>
              </ul>
            </dd>
          </dl>
      </div>
    )
  }
}

export default Resources;
