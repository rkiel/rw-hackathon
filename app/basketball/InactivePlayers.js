var React       = require('react');
var PlayerStore = require('./PlayerStore');

function getInitialState() {
  return {
    players: PlayerStore.getInactivePlayers()
  }
}

function render() {

  var buttons = this.state.players.map(function(player) {
    return (
      <button className='btn btn-default'>{player.first}</button>
      );
  });

  return(
      <div>
      { buttons }
      </div>
  );
}

var InactivePlayers = React.createClass({
  getInitialState: getInitialState,
  render: render
});

module.exports = InactivePlayers;
