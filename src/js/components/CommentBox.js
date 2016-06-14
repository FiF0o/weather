/**
 * Created by jonlazarini on 12/06/16.
 */
import React from 'react'
import JQuery from 'jquery'

import CommentForm from './CommentForm'
import CommentAvatarList from './CommentAvatarList'
import Comment from './Comment'

export default class CommentBox extends React.Component {

    constructor() {
        super();

        this.state = {
            showComments: false,
            comments: []
        };

        //pre-bind method to class scope which is CommentBox and can be
        // passed around without having to use .bind(this) at prop level in
        // the component below onDelete={}
        // bind(this) binds the context to the instance of the class rather
        // than the class itself...
        this._deleteComment = this._deleteComment.bind(this)
        this._addComment = this._addComment.bind(this)
    }

    componentWillMount() {
        this._fetchComments();
    }

    render() {
        const comments = this._getComments();
        return (
          <div className="row comments-container">
              <div className="cell">
                  <h2>Join The Discussion</h2>
                  <div className="comment-box">
                      <CommentForm addComment={this._addComment} />
                      <CommentAvatarList avatars={this._getAvatars()} />

                      {this._getPopularMessage(comments.length)}
                      <h3 className="comment-count">{this._getCommentsTitle(comments.length)}</h3>
                      <div className="comment-list">
                          <button onClick={this._toggleComments.bind(this)} >{this.state.showComments ? "Hide" +
                          " comment" : "Show comment"}</button>
                          {this.state.showComments ? <div className="comment-list">{comments}</div> : null}
                      </div>
                  </div>
              </div>
          </div>
        );
    }
    //TODO bind(this) at the constructor level to increase perf and not rely
    // on garbage collector to destroy objects when not used
    _toggleComments(e) {
        
        this.setState({showComments: !this.state.showComments})
        e.preventDefault();
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

