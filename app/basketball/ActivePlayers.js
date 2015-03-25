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
    var columns = [];
    columns.push(
      <td>
        <button className='btn btn-default' onClick={_onClick.bind(this,player.number)}>{player.first}</button>
      </td>
    );
    if (PlayerStore.isOffense()) {
      columns.push(
        <td>
          <button className='btn btn-default' onClick={_onOffense.bind(this,player.number,'score 3')}>+3</button>
          <button className='btn btn-default' onClick={_onOffense.bind(this,player.number,'miss 3')}>-3</button>
        </td>
      );
      columns.push(
        <td>
          <button className='btn btn-default' onClick={_onOffense.bind(this,player.number,'score 2')}>+2</button>
          <button className='btn btn-default' onClick={_onOffense.bind(this,player.number,'miss 2')}>-2</button>
        </td>
      );
      columns.push(
        <td>
          <button className='btn btn-default' onClick={_onOffense.bind(this,player.number,'score 1')}>+1</button>
          <button className='btn btn-default' onClick={_onOffense.bind(this,player.number,'miss 1')}>-1</button>
        </td>
      );
      columns.push(
        <td>
          <button className='btn btn-default' onClick={_onOffense.bind(this,player.number,'rebound')}>Rebound</button>
        </td>
      );
      columns.push(
        <td>
          <button className='btn btn-default' onClick={_onOffense.bind(this,player.number,'foul')}>Foul</button>
        </td>
      );
    }
    if (PlayerStore.isDefense()) {
      columns.push(
        <td>
          <button className='btn btn-default' onClick={_onDefense.bind(this,player.number,'rebound')}>Rebound</button>
        </td>
      );
      columns.push(
        <td>
          <button className='btn btn-default' onClick={_onDefense.bind(this,player.number,'foul')}>Foul</button>
        </td>
      );
    }


    return (
      <tr key={player.number}>
        { columns }
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

function _onOffense(number,statistic) {
  Actions.recordOffense(number,statistic);
}

function _onDefense(number,statistic) {
  Actions.recordDefense(number,statistic);
}

function _onStoreChange() {
  this.setState({players: PlayerStore.getActivePlayers()});
}
