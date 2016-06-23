/**
 * Created by jonlazarini on 22/06/16.
 */
import React from 'react';

export default class WeatherHeader extends React.Component {
  render() {
    return (
      <div>
        {this.props.name}
        <p>{ this.props.location }</p>
        
        <p>{ new Date().toString().substring(0, 16) } </p>
      </div>
    );
  }
}

//TODO Replace new Date() by data from API - Timestamp data
//<p>{ this.props.today.getDate() }</p>
