var Events         = require('../constants/Events');
var Dispatcher     = require('../dispatcher/Dispatcher');
var EventEmitter   = require('events').EventEmitter;
var ObjectAssign   = require('react/lib/Object.assign');
var EMITTER_CHANGE = 'change';

var _store = {
  list: [
    { title: 'Project 1', code: 'project1', direct: true,  total: 0 },
    { title: 'Project 2', code: 'project2', direct: true,  total: 0 },
    { title: 'PTO',       code: 'pto',      direct: false, total: 0 },
    { title: 'Holiday',   code: 'holiday',  direct: false, total: 0 },
    { title: 'Training',  code: 'training', direct: false, total: 0 }
  ],

  day: {
  }
};

var _emitter = ObjectAssign({}, EventEmitter.prototype);
_emitter.setMaxListeners(0);

function getList() {
  return _store.list;
}

function getDay(date) {
  var day = _store.day[date];
  if (!day) {
    _store.day[date] = {
      data: { },
      total: 0
    }
  }
  return _store.day[date];
}

function timeChange(data) {
  var day = _store.day[data.date];
  day.data[data.code] = data.value;
  var total = 0;
  Object.keys(day.data).forEach(function(x) {
    total = total + day.data[x];
  });
  day.total = total;

  var monthlyTotal = 0;
  Object.keys(_store.day).forEach(function(key) {
    var column = _store.day[key].data;
    var value = column[data.code];
    if (isNaN(value)) {
      value = 0;
    }
    monthlyTotal = monthlyTotal + value;
  });

  _store.list.forEach(function(x) {
    if (x.code === data.code) {
      x.total = monthlyTotal;
    }
  });

  _emitter.emit(EMITTER_CHANGE);
}

function handleDispatch(payload){
  var action = payload.action;

  switch(action.actionType){
    case Events.TIME_CHANGE:
      timeChange(action.data);
      break;
    default:
      return true;
  }

}

function addListener(cb) {
  _emitter.on(EMITTER_CHANGE, cb);
}

function removeListener(cb) {
  _emitter.removeListener(EMITTER_CHANGE, cb);
}

Dispatcher.register(handleDispatch);

var ChargeCodeStore = {
  addListener:    addListener,
  removeListener: removeListener,
  getDay:         getDay,
  getList:        getList
}

module.exports = ChargeCodeStore;
