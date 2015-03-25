var Events         = require('./Constants');
var Dispatcher     = require('./Dispatcher');
var EventEmitter   = require('events').EventEmitter;
var ObjectAssign   = require('react/lib/Object.assign');
var EMITTER_CHANGE = 'change';

function isOffense() {
  return _store.mode === 'OFFENSE';
}

function isDefense() {
  return _store.mode === 'DEFENSE';
}

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

function getOurScore() {
  return _store.score.us;
}

function getTheirScore() {
  return _store.score.them;
}

function addListener(cb) {
  _emitter.on(EMITTER_CHANGE, cb);
}

function removeListener(cb) {
  _emitter.removeListener(EMITTER_CHANGE, cb);
}

Dispatcher.register(_handleDispatch);

var PlayerStore = {
  getActivePlayers: getActivePlayers,
  getInactivePlayers: getInactivePlayers,
  getOurScore:        getOurScore,
  getTheirScore:      getTheirScore,
  addListener:        addListener,
  isOffense:          isOffense,
  isDefense:          isDefense,
  removeListener:     removeListener
}

module.exports = PlayerStore;

var _store = {
  mode: "OFFENSE",
  score: {us: 0, them: 0},
  players: [
    {first: 'Sarah', last: 'One',   number: 21, active: false, stats: {} },
    {first: 'Ruth',  last: 'Two',   number: 22, active: false, stats: {} },
    {first: 'Tati',  last: 'Three', number: 23, active: false, stats: {} },
    {first: 'Kiki',  last: 'Four',  number: 24, active: false, stats: {} }
  ]
}

var _emitter = ObjectAssign({}, EventEmitter.prototype);
_emitter.setMaxListeners(0);

function _getPlayer(number) {
  var p;
  _store.players.forEach(function(player) {
    if (player.number === number) {
      p = player;
    }
  });
  return p;
}

function _moveToInactive(number) {
  _store.players.forEach(function(player) {
    if (player.number === number) {
      player.active = false;
    }
  });
}

function _moveToActive(number) {
  _store.players.forEach(function(player) {
    if (player.number === number) {
      player.active = true;
    }
  });
}

function _recordOffense(number, statistic) {
  var player = _getPlayer(number);
  switch (statistic) {
    case 'score 3':
      _store.score.us += 3;
      _emitter.emit(EMITTER_CHANGE);
      break;
    case 'score 2':
      _store.score.us += 2;
      _emitter.emit(EMITTER_CHANGE);
      break;
    case 'score 1':
      _store.score.us += 1;
      _emitter.emit(EMITTER_CHANGE);
      break;
  }
  if (! player.stats['offense '+statistic]) {
    player.stats['offense '+statistic] = 0;
  }
  player.stats['offense '+statistic] += 1;
}

function _recordDefense(number, statistic) {
  var player = _getPlayer(number);
  if (! player.stats['defense '+statistic]) {
    player.stats['defense '+statistic] = 0;
  }
  player.stats['defense '+statistic] += 1;
}

function _handleDispatch(payload){
  var action = payload.action;

  switch(action.actionType){
    case Events.RECORD_OFFENSE:
      _recordOffense(action.data.number, action.data.statistic);
      break;
    case Events.RECORD_DEFENSE:
      _recordDefense(action.data.number, action.data.statistic);
      break;
    case Events.MOVE_TO_INACTIVE:
      console.log("INACTIVE " + action.data);
      _moveToInactive(action.data);
      _emitter.emit(EMITTER_CHANGE);
      break;
    case Events.MOVE_TO_ACTIVE:
      console.log("ACTIVE " + action.data);
      _moveToActive(action.data);
      _emitter.emit(EMITTER_CHANGE);
      break;
    default:
      return true;
  }
}
