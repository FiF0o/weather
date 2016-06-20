import React from 'react';

export default class Item extends React.Component {
  constructor(){
      super();

      this.state = {

      }
  }
  render() {

    return(
      <div className="item">
        <p>title: {this.props.title}</p>
        <p>body: {this.props.body}/</p>
      </div>
    );
  }
}
