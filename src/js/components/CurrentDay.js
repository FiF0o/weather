/**
 * Created by jonlazarini on 22/06/16.
 */
import React from 'react';

export default class CurrentDay extends React.Component  {
  render() {
    return (
      <div>
        <p>{ this.props.temp }</p>
        <p>{ this.props.description }</p>        
      </div>
    );
  }
}
