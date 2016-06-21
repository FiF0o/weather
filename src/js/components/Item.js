import React from 'react';

export default class Item extends React.Component {
  constructor(){
      super();

      this.state = {
      };
  }
  render() {

    return(
      <div className="item">
        <p>dt_txt: {this.props.dt_txt}</p>
    
      </div>
    );
  }
}
