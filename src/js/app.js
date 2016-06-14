import React from 'react'
import ReactDOM from 'react-dom'
//TODO Fix JQuery bug... AMD vs browserify?!?
import JQuery from 'jquery'
//import CommentBox from './components/comment/comment-box'

//TODO Import Router, Route
//TODO Import Layout as parent component and inject page & commentbox

import {hashHistory, Router, Route, Redirect} from 'react-router'

import Layout from './layout/layout'

import BlogPage from './pages/blog-page'
import PicturePage from './pages/picture-page'
import VideoPage from './pages/video-page'
//on this Route, / component Layout is being rendered

/*
this.props.children are being passed here (nested) when declaring
this.props.children on the parent class 
*/
const app = (
  <Router history={hashHistory}>
    <Redirect from="/" to="/blog" />
   
    <Route path="/" component={Layout}>

      <Route path="blog" component={BlogPage}/>
      <Route path="picture" component={PicturePage}/>
      <Route path="video" component={VideoPage}/>
    </Route>

  </Router>
)

JQuery(function() {
    ReactDOM.render(
    app,
        document.getElementById('comment-box'),
        function() {
            console.timeEnd('react-time')
        }
    );
});
