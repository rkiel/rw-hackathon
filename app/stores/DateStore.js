var Dispatcher     = require('../dispatcher/Dispatcher');
var EventEmitter   = require('events').EventEmitter;
var ObjectAssign   = require('react/lib/Object.assign');
var DateHelper     = require('../utils/DateHelper');
var EMITTER_CHANGE = 'change';
var Events         = require('../constants/Events');

function addListener(cb) {
  _emitter.on(EMITTER_CHANGE, cb);
}

function removeListener(cb) {
  _emitter.removeListener(EMITTER_CHANGE, cb);
}

function getYear() {
  return _store.year;
}

function getMonth() {
  return _store.month;
}

function getStartDay() {
  return _store.startDay;
}

function getEndDay() {
  return _store.endDay;
}

var DateStore = {
  addListener:    addListener,
  removeListener: removeListener,
  getYear:        getYear,
  getMonth:       getMonth,
  getStartDay:    getStartDay,
  getEndDay:      getEndDay
}

module.exports = DateStore;

Dispatcher.register(_handleDispatch);

var _emitter = ObjectAssign({}, EventEmitter.prototype);
_emitter.setMaxListeners(0);

var _store = {
  year:     2012,
  month:    0,
  startDay: 1,
  endDay:   31
};

function _handleDispatch(payload){
  var action = payload.action;

  switch(action.actionType){
    case Events.TIME_START:
      var startDate  = action.data.startDate;
      var endDate    = action.data.endDate;
      _store.year    = startDate.getFullYear();
      _store.month   = startDate.getMonth();
      _store.startD  = startDate.getDay();
      _store.endDay  = endDate.getDay();
      break;
    default:
      return true;
  }
}

