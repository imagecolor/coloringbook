var React = require('react');
var PhotoUpload = require('../components/photoUpload');

var MainView = React.createClass({
  render: function() {
    return (
      <h3>Main View</h3>
      <PhotoUpload />
    );
  }
});

module.exports = MainView;