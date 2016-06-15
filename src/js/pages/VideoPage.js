/**
 * Created by jonlazarini on 13/06/16.
 */
import React from 'react'
import CommentBox from '../components/CommentBox'

export default class VideoPage extends React.Component {
  render() {
    return (
      <div>
        <div className="cell">
          <div className="article--video-author">
            Picture by <strong>@video-page</strong>
          </div>  
          <div className="video-wrapper">
            <iframe width="630" height="315" src="https://www.youtube.com/embed/Ovj4hFxko7c" frameborder="0" allowfullscreen></iframe>
          </div>
        </div> 

        <CommentBox apiUrl="api/comment/comments.json"/>
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
