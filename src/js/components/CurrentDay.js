/**
 * Created by jonlazarini on 22/06/16.
 */
import React from 'react';

export default class CurrentDay extends React.Component  {

  constructor() {
    super();
    this.state = {
    };
  }
  render() {
    return (
      <div>
        <p>{this.props.temp}</p>
        <p>{this.props.description}</p>
      </div>
    );
  }
}
