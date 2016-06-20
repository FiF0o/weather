/**
 * Created by jonlazarini on 12/06/16.
 */
import React from 'react'
import JQuery from 'jquery'

export default class CommentBox extends React.Component {

    constructor() {
        super();

        this.state = {
            
        };

        /*
        pre-bind method to class scope which is CommentBox and can be
        passed around without having to use .bind(this) at prop level in
        the component below onDelete={}
        bind(this) binds the context to the instance of the class rather
        than the class itself...
        */

    }
    /*
     lifecycle method is used as fetchComments calls render and it will be
     an infinite loop...
      */

    componentWillMount() {
      
    }
    /*
     Start polling process for AJAX request here and rerenders components
     every 5 secs
     Memory leak as the timer is created (setInterval()) everytime the page is
     rendered on
      he page
     */
    
    componentDidMount() {
        
    }

    //destroys timer when about to be remove removed - no more memory leak
    componentWillUnmout() {
        
    }

    render() {
        return (
          <div>Comment box here</div>
        );
    }
    


    /**
     * server side
    */
    
        /*
        * optimistic update
        * 1- create new array by copying elements of the state - clone array
        * 2- find Index of the comment to be deleted in the array
        * 3- delete at 1 comment at the position index
        * */


    
        /*
        Method is passed down, propagated to the child componentCommentForm as we can pass function as argument - functions are
        first class citizen - onComment is a prop at the parent component
        level that will be passed down/called in the child component
        */

        /*
         Instead of push() which doesnt return the new array but only mutate
          it, we can also use concat()in the method
          setState({
            comments: this.state.concat([comment])
          })
         
          */

      /**
       *  ADD COMMENT GENERATED ON SERVER SIDE (above is client side)
       * One way control flow example
       *
       *
       *  const comment= { author, body };
       *
       *  JQuery.post('/api/comments', { comment })
       *    .success(newComment => {
       *        this.setState({comments:
        *        this.state.comments.concat([newComment])});
       *    });
       */

    



}

