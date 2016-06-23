/**
 * Created by jonlazarini on 13/06/16.
 */
import React from 'react';
import WeatherBody from '../components/WeatherBody';

export default class WeatherPage extends React.Component {
  render() {
    return (
      <div>
        <img src="./assets/images/adaptive-paths-guide-to-experience-mapping-1320px.jpg"/>
        <WeatherBody />
      </div>
    )
  }

}
/*
declare a prop apiUrl for the CommentBox of the BlogPage
(parent) so that it can be passed down to CommentBox comp.

url will be passed a parameter to the AJAX Call in the children
component CommentBox using this.props.apiUrl - _fetchComments() method
*/
