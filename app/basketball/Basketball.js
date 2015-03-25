var React           = require('react');
var Banner          = require('./Banner');
var ActivePlayers   = require('./ActivePlayers');
var InactivePlayers = require('./InactivePlayers');

function render() {
  return(
    <div>
      <Banner />
      <ActivePlayers />
      <InactivePlayers />
    </div>
  );
}

var Basketball = React.createClass({
  render: render
});

module.exports = Basketball;
