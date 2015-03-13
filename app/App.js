var React = require('react');
var Month = require('./components/Month');

var App = React.createClass({
  render: function(){
    return (
      <div className="container">
        <Month />
      </div>
    )
  }
});

React.render(
  <App />,
  document.getElementById('app')
)
