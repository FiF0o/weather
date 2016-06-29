import React from 'react';

export default class WeatherListTable extends React.Component {
  render() {
    return (
        <tr>
          <td>req city: { this.props.requestCity }</td>
          <td>{ this.props.day }</td>
          <td>{ this.props.description }</td>
          <td>{ this.props.temp }</td>
        </tr>
    );
  }
}
