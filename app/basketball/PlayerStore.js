
function getActivePlayers() {
  return _store.players.filter(function(player) {
    return player.active;
  });
}

function getInactivePlayers() {
  return _store.players.filter(function(player) {
    return ! player.active;
  });
}

var PlayerStore = {
  getActivePlayers: getActivePlayers,
  getInactivePlayers: getInactivePlayers
}

module.exports = PlayerStore;

var _store = {
  players: [
    {first: 'Sarah', last: 'aaaa', number: 21, active: true},
    {first: 'Ruth',  last: 'bbbb', number: 22, active: true},
    {first: 'Tati',  last: 'cccc', number: 23, active: false},
    {first: 'Kiki',  last: 'dddd', number: 24, active: false}
  ]
}
