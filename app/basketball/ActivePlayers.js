var React             = require('react');
var PlayerStore       = require('./PlayerStore');
var Actions           = require('./Actions');

function getInitialState() {
  return {
    players: PlayerStore.getActivePlayers()
  }
}

function componentDidMount() {
  PlayerStore.addListener(_onStoreChange.bind(this));
}

function componentWillUnmount() {
  PlayerStore.removeListener(_onStoreChange.bind(this));
}

function render() {

  var buttons = this.state.players.map(function(player) {
    return (
      <tr key={player.number}>
        <td>
          <button className='btn btn-default' onClick={_onClick.bind(this,player.number)}>{player.first}</button>
        </td>
      </tr>
      );
  });

  return(
    <table className='table'>
      { buttons }
    </table>
  );
}

var ActivePlayers = React.createClass({
  getInitialState:      getInitialState,
  componentDidMount:    componentDidMount,
  componentWillUnmount: componentWillUnmount,
  render:               render
});

module.exports = ActivePlayers;

function _onClick(number) {
  Actions.moveToInactive(number);
}

function _onStoreChange() {
  this.setState({players: PlayerStore.getActivePlayers()});
}
