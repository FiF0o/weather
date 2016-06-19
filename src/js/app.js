import React from 'react'
import ReactDOM from 'react-dom'
import JQuery from 'jquery'
// import Bootstrap from '../vendors/bootstrap-sass/assets/javascripts/bootstrap'
// console.log(Bootstrap)

//import Bootstrap from 'react-bootstrap';

//console.log(Bootstrap)
import {hashHistory, Router, Route, Redirect} from 'react-router'

import Layout from './layout/Layout'

import BlogPage from './pages/BlogPage'
//on this Route, / component Layout is being rendered

/*
this.props.children (<Route>)are being passed here (nested) when declaring
this.props.children on the parent class 
*/
const app = (
  <Router history={hashHistory}>
    <Redirect from="/" to="/blog" />
   
    <Route path="/" component={Layout}>
      <Route path="blog" component={BlogPage}/>
    </Route>

  </Router>
)

JQuery(function() {
    ReactDOM.render(
    app,
        document.getElementById('app'),
        function() {
            console.timeEnd('react-time')
        }
    );
});
