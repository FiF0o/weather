/**
 * Created by jonlazarini on 22/06/16.
 */
import React from 'react';

export default class CurrentDay extends React.Component  {
  render() {
    return (
      <div>
        <p>date: {this.props.date.toString()}</p>
        <p>day: {this.props.date.getDay()}</p>
        <p>temp: {this.props.temp}</p>
        <p>description: {this.props.description}</p>
      </div>
    );
  }
}
