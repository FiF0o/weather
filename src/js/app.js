import React from 'react'
import ReactDOM from 'react-dom'
//TODO Fix JQuery bug... AMD vs browserify?!?
import JQuery from 'jquery'
import CommentBox from './components/comment/comment-box'
//import config from "../config"
//
//console.log(config.source);

////Binds JQuery to the global scope
//window.$ = window.jQuery = require('jquery');
//console.log(JQuery);

//TODO Import Router, Route
//TODO Import Layout as parent component and inject page & commentbox

JQuery(function() {
    ReactDOM.render(
    <CommentBox />,
        document.getElementById('comment-box'),
        function() {
            console.timeEnd('react-time')
        }
    );
});
