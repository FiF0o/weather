/**
 * Created by jonlazarini on 13/06/16.
 */
import React from 'react';
import WeatherBox from '../components/WeatherBox';

export default class WeatherPage extends React.Component {
  render() {
    return (
      <div>
        <div className="cell">
          <h1 className="article-title">Weather page</h1>

          <div className="article-body">
            <p>
              The term “artificial intelligence” has been floating around since the
              mid-20th century &mdash; a phrase encompassing “the science and engineering
              of intelligent machines.” But what of robots’ emotional intelligence?
              Though humans largely fear this aspect of the robot race, there’s no
              need. According to the handbook for the Society of Emotionally
              Available Robots (SEAR):
            </p>
            <blockquote>
              What humans need to understand is that all beings simply want to love
              and be loved. After all, as the Beatles sang, “All you need is love.”
              (Moving past the fact, of course, that the lyric “love” was
              originally “oil,” as the Beatles were the original robot band and
              required oil to survive.)
            </blockquote>
          </div>
        </div>

        <WeatherBox />
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
