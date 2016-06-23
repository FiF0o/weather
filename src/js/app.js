import React from 'react';
import ReactDOM from 'react-dom';

/**
 * Bug using browserify when importing module, CommonJS synthax...*
 */
// const $ = window.$ = window.jQuery = require('jquery');
// const Bootstrap = require('bootstrap-sass');
// console.log(Bootstrap)

/**
 * //TODO Need to be replaced by react-bootstrap when importing components
 */
// import { Button } from 'react-bootstrap';
// console.log(Button)

import {hashHistory, Router, Route, Redirect} from 'react-router'
import Layout from './layout/Layout'
import WeatherPage from './pages/WeatherPage'
//on this Route, / component Layout is being rendered

/*
this.props.children (<Route>)are being passed here (nested) when declaring
this.props.children on the parent class
*/
const app = (
  <Router history={hashHistory}>
    <Redirect from="/" to="/currentweather" />

    <Route path="/" component={Layout}>
      <Route path="currentweather" component={WeatherPage}/>
    </Route>

  </Router>
);


ReactDOM.render(
app,
    document.getElementById('app'),
    function() {
        console.timeEnd('react-time')
    }
);
