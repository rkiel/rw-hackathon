
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
    {first: 'Sarah', last: 'aaaa', active: true},
    {first: 'Ruth',  last: 'bbbb', active: true},
    {first: 'Tati',  last: 'cccc', active: false},
    {first: 'Kiki',  last: 'dddd', active: false}
  ]
}
