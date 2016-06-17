/**
 * Created by jonlazarini on 12/06/16.
 */
import React from 'react'


export default class CommentForm extends React.Component {
    constructor() {
        super();
        this.state = {
            characters: 0
        };
      this._handleSubmit = this._handleSubmit.bind(this)
      this._getCharacterCount = this._getCharacterCount.bind(this)
    }

    render() {
        return (
          /*
          -> use ref for the onSubmit method to access inputs/fields
           reference the component in the class from anywhere after it s
           been rendered
           this will create a new class property named _body
           -> renders function will trigger the function on the ref

           onSubmit, onClick are (native) synthetic events which are mapping
            all the webs browser events, give consistency so that wen
             browsers have the same behaviours
          */
          <form className="comment-form" onSubmit={this._handleSubmit}>
              <label>New comment</label>
              <div className="comment-form-fields">

                  <input placeholder="Name:" ref={(input) => this._author = input} />
                  <textarea placeholder="Comment:" ref={(textarea) => this._body = textarea} onChange={this._getCharacterCount}></textarea>
              </div>
              <p>{this.state.characters} characters</p>
              <div className="comment-form-actions">
                  <button type="submit">
                      Post comment
                  </button>
              </div>
          </form>
        );
    }

    _getCharacterCount() {

        this.setState({
            characters: this._body.value.length
        });

    }

    _handleSubmit(event) {
        event.preventDefault();
        // pass addComment() method from parent component which is CommentBox
        this.props.addComment(this._author.value, this._body.value);

        this._author.value = '';
        this._body.value = '';

        this.setState({ characters: 0  });
    }
}
