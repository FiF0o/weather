import React from 'react';

export default class WeatherList extends React.Component {
  constructor(){
      super();

      this.state = {
      };
  }
  render() {

    return(
      <div className="item">
        <ul>
          <li>
            Day: 
          </li>
          <li>
            Tem: {this.props.temp}
          </li>
          <li>
            main: {this.props.description}
          </li>
        </ul>
      </div>
    );
  }
}
