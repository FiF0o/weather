/**
 * Created by jonlazarini on 22/06/16.
 */
import React from 'react';

export default class CurrentDay extends React.Component  {
  render() {
    return (
      <div className="weather-block">
        <h1><span>{ this.props.temp }</span>℃ today, feels like { this.props.temp }<span>	&deg;</span>.</h1>
        <br/>
        <h2>There is<span>&nbsp;</span><span>{ this.props.description }</span><span>&nbsp;</span>out.</h2>
        <br/>
      </div>
    );
  }
}
