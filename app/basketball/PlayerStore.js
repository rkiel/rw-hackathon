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
  addListener:        addListener,
  isOffense:          isOffense,
  isDefense:          isDefense,
  removeListener:     removeListener
}

module.exports = PlayerStore;

var _store = {
  mode: "OFFENSE",
  players: [
    {first: 'Sarah', last: 'One',   number: 21, active: false},
    {first: 'Ruth',  last: 'Two',   number: 22, active: false},
    {first: 'Tati',  last: 'Three', number: 23, active: false},
    {first: 'Kiki',  last: 'Four',  number: 24, active: false}
  ]
}

var _emitter = ObjectAssign({}, EventEmitter.prototype);
_emitter.setMaxListeners(0);

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

function _handleDispatch(payload){
  var action = payload.action;

  switch(action.actionType){
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
