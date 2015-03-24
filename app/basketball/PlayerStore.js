
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
    {first: 'Sarah', active: true},
    {first: 'Ruth',  active: true},
    {first: 'Tati',  active: false},
    {first: 'Kiki',  active: false}
  ]
}
