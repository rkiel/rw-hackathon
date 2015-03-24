var React       = require('react');
var PlayerStore = require('./PlayerStore');
var Actions     = require('./Actions');

function getInitialState() {
  return {
    players: PlayerStore.getInactivePlayers()
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
      <button key={player.number} className='btn btn-default' onClick={_onClick.bind(this,player.number)}>{player.first}</button>
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
  componentDidMount:    componentDidMount,
  componentWillUnmount: componentWillUnmount,
  render: render
});

module.exports = InactivePlayers;

function _onClick(number) {
  Actions.moveToActive(number);
}

function _onStoreChange() {
  this.setState({players: PlayerStore.getInactivePlayers()});
}
