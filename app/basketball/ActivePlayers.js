var React       = require('react');
var PlayerStore = require('./PlayerStore');

function getInitialState() {
  return {
    players: PlayerStore.getActivePlayers()
  }
}

function render() {

  var buttons = this.state.players.map(function(player) {
    return (
      <button key={player.last} className='btn btn-default'>{player.first}</button>
      );
  });

  return(
      <div>
      { buttons }
      </div>
  );
}

var ActivePlayers = React.createClass({
  getInitialState: getInitialState,
  render: render
});

module.exports = ActivePlayers;
