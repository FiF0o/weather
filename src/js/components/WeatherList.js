import React from 'react';

export default class WeatherList extends React.Component {
  render() {
    return (
      <div className="weather-list">
        <ul className="clearfix">
          <li>
            {this.props.day}
          </li>
          <li>
            {this.props.temp}
          </li>
          <li>
            {this.props.description}
          </li>
        </ul>
      </div>
    );
  }
}
