var React           = require('react');
var InactivePlayers = require('./InactivePlayers');

function render() {
  return(
    <InactivePlayers />
  );
}

var Basketball = React.createClass({
  render: render
});

module.exports = Basketball;
