var React           = require('react');
var ActivePlayers   = require('./ActivePlayers');
var InactivePlayers = require('./InactivePlayers');

function render() {
  return(
      <div>
    <ActivePlayers />
    <InactivePlayers />
    </div>
  );
}

var Basketball = React.createClass({
  render: render
});

module.exports = Basketball;
