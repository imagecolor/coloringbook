var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var jsfeat = require('./jsfeat');
window.jQuery = require('jquery');
var MainView = require('./views/mainView.js');

ReactDOM.render(
  <MainView/>,
  document.getElementById('coloringApp')
);