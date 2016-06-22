/**
 * Created by jonlazarini on 13/06/16.
 */

import React from 'react'
import { Link } from 'react-router'

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <div className="top-menu">
          <ul>
            <li>
              <Link to="/currentweather">Current weather</Link>
            </li>
          </ul>
        </div>

        {this.props.children}
      </div>
    )
  }
}
// this.props.children is a placeholder to receive components or anything
// else from its parent - <Route> are rendered in this.props.children
