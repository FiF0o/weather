/**
 * Created by jonlazarini on 13/06/16.
 */
import React from 'react'
import CommentBox from '../components/CommentBox'

export default class PicturePage extends React.Component {
  render() {
    return (
      <div>
        <div className="cell">
          <article className="article article--video">
            <div className="article--video-author">
              Picture by <strong>@picture-page</strong>
            </div>

            <div className="article--video-img">
              <img src="assets/images/videos" alt=""/>
            </div>
          </article>
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
