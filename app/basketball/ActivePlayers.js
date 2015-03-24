var React             = require('react');
var PlayerStore       = require('./PlayerStore');
var Actions           = require('./Actions');

function getInitialState() {
  return {
    players: PlayerStore.getActivePlayers()
  }
}

function render() {

  var buttons = this.state.players.map(function(player) {
    return (
      <button key={player.number} className='btn btn-default' onClick={_onClick.bind(this,player.number)}>{player.first}</button>
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

function _onClick(number) {
  Actions.moveToInactive(number);
}
