import React from 'react';

export default class WeatherList extends React.Component {
  render() {
    return (
      <div className="item">
        <ul>
          <li>
            Temp: {this.props.temp}
            Description: {this.props.description}
          </li>
        </ul>
      </div>
    );
  }
}
