/**
 * Created by jonlazarini on 22/06/16.
 */
import React from 'react';

export default class WeatherHeader extends React.Component {
  render() {
    return (
      <div>
        <h4><span>{this.props.name}</span>,<span>&nbsp;</span><span>{ this.props.location }</span></h4>
        <h3>{ new Date().toString().substring(0, 16) } </h3>
      </div>
    );
  }
}

//TODO Replace new Date() by data from API - Timestamp data
//<p>{ this.props.today.getDate() }</p>
