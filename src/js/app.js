import React from 'react';
import ReactDOM from 'react-dom';

/**
 * Bug using browserify when importing module, CommonJS synthax...*
 */
const $ = window.$ = window.jQuery = require('jquery');
const Bootstrap = require('bootstrap-sass');

/**
 * //TODO Need to be replaced by react-bootstrap when importing components
 */
// import { Button } from 'react-bootstrap';
// console.log(Button)

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

$(function() {
    ReactDOM.render(
    app,
        document.getElementById('app'),
        function() {
            console.timeEnd('react-time')
        }
    );
});
