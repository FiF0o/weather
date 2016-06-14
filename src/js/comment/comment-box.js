/**
 * Created by jonlazarini on 12/06/16.
 */
import React from 'react'
import JQuery from 'jquery'

import CommentForm from './comment-form'
import CommentAvatarList from './comment-avatar-list'
import Comment from './comment'

export default class CommentBox extends React.Component {

    constructor() {
        super();

        this.state = {
            showComments: false,
            comments: []
        };

        //pre-bind method to class scope which is CommentBox and can be
        // passed around without having to use .bin(this) at prop level in
        // the component below onDelete={}
        this._deleteComment = this._deleteComment.bind(this)
        this._addComment = this._addComment.bind(this)
    }

    componentWillMount() {
        this._fetchComments();
    }

    render() {
        const comments = this._getComments();
        return(
          <div className="row comments-container">
              <div className="cell">
                  <h2>Join The Discussion</h2>
                  <div className="comment-box">
                      <CommentForm addComment={this._addComment} />
                      <CommentAvatarList avatars={this._getAvatars()} />

                      {this._getPopularMessage(comments.length)}
                      <h3 className="comment-count">{this._getCommentsTitle(comments.length)}</h3>
                      <div className="comment-list">
                          {comments}
                      </div>
                  </div>
              </div>
          </div>
        );
    }

    _getAvatars() {
        return this.state.comments.map(comment => comment.avatarUrl);
    }

    _getPopularMessage(commentCount) {
        const POPULAR_COUNT = 10;
        if (commentCount > POPULAR_COUNT) {
            return (
                <div>This post is getting really popular, don't miss out!</div>
            );
        }
    }

    _getComments() {
        return this.state.comments.map((comment) => {
            /* spread operator to return comment.id, comment.author,
             comment.body, comment.avatarUrl etc..
             all comment properties */
            return <Comment
                {...comment}
                onDelete={this._deleteComment}
                key={comment.id}
            />
            // onDelete - declare this._deleteComment in constructor
        });
    }

    _getCommentsTitle(commentCount) {
        if (commentCount === 0) {
            return 'No comments yet';
        } else if (commentCount === 1) {
            return '1 comment';
        } else {
            return `${commentCount} comments`;
        }
    }

    _addComment(commentAuthor, commentBody) {

        const comment = {
            id: this.state.comments.length + 1,
            author: commentAuthor,
            body: commentBody,
            avatarUrl: 'assets/images/avatars/avatar-default.png'
        };

        this.setState({
            comments: this.state.comments.concat([comment])
        });

    }

    _fetchComments() {
        JQuery.ajax({
            method: 'GET',
        //TODO Change final js file bundle.js to be dist at root level ./public
            //url: 'api/comment/comments.json',

            // Receives apiUrl prop from parent component: PicturePage,
            // BlogPage, etc..
            url: this.props.apiUrl,
            success: (comments) => {
                this.setState({ comments })
            }
        });
    }

    _deleteComment(commentID) {
        const comments = this.state.comments.filter(
            comment => comment.id !== commentID
        );
                    // NTM
        this.setState({ comments });
    }

}

CommentBox.propTypes = {
    // will define a prop as being mandatory to work
    apiUrl: React.PropTypes.string.isRequired
}

