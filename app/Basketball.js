var React       = require('react');
var Basketball  = require('./basketball/Basketball');

var App = React.createClass({
  render: function(){
    return (
      <div className="container">
        <Basketball />
      </div>
    )
  }
});

React.render(
  <App />,
  document.getElementById('app')
)
