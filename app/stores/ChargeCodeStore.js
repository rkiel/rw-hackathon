var Events         = require('../constants/Events');
var Dispatcher     = require('../dispatcher/Dispatcher');
var EventEmitter   = require('events').EventEmitter;
var ObjectAssign   = require('react/lib/Object.assign');
var DateHelper      = require('../utils/DateHelper');
var EMITTER_CHANGE = 'change';

var _store = {
  list: [
    { title: 'Project 1', code: 'project1', direct: true,  total: 0 },
    { title: 'Project 2', code: 'project2', direct: true,  total: 0 },
    { title: 'PTO',       code: 'pto',      direct: false, total: 0 },
    { title: 'Holiday',   code: 'holiday',  direct: false, total: 0 },
    { title: 'Training',  code: 'training', direct: false, total: 0 }
  ],

  day: { },

  grandTotal:  0,

  magicNumber: 0,

  inTheHole:   0
};

var _emitter = ObjectAssign({}, EventEmitter.prototype);
_emitter.setMaxListeners(0);

function getGrandTotal() {
  return _store.grandTotal;
}

function getMagicNumber() {
  return _store.magicNumber;
}

function getInTheHole() {
  return _store.inTheHole;
}

function getList() {
  return _store.list;
}

function getDay(date) {
  var dateHelper = new DateHelper(date);
  var key = date.getDate();
  var day = _store.day[key];
  if (!day) {
    _store.day[key] = {
      data:     { },
      total:    0,
      expected: (dateHelper.isWeekday() ? 8 : 0)
    }
  }
  console.log( _store.day[key] );
  return _store.day[key];
}

function timeChange(data) {
  var day = _store.day[data.date];
  day.data[data.code] = data.value;
  var rowTotal = 0;
  Object.keys(day.data).forEach(function(x) {
    rowTotal = rowTotal + day.data[x];
  });
  day.total = rowTotal;

  var columnTotal = 0;
  Object.keys(_store.day).forEach(function(key) {
    var column = _store.day[key].data;
    var value = column[data.code];
    if (isNaN(value)) {
      value = 0;
    }
    columnTotal = columnTotal + value;
  });

  _store.list.forEach(function(x) {
    if (x.code === data.code) {
      x.total = columnTotal;
    }
  });

  _store.grandTotal = 0;
  _store.list.forEach(function(x) {
    _store.grandTotal = _store.grandTotal + x.total;
  });

  var magicNumber = 0;
  var inTheHole = 0;
  Object.keys(_store.day).forEach(function(key) {
    magicNumber = magicNumber + _store.day[key].expected;
    if (_store.day[key].total > 0) {
      inTheHole = inTheHole + _store.day[key].total;
    } else {
      inTheHole = inTheHole + _store.day[key].expected;
    }
  });
  _store.magicNumber = magicNumber
  _store.inTheHole   = inTheHole - magicNumber;

  debugger;

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
  getList:        getList,
  getGrandTotal:  getGrandTotal,
  getMagicNumber: getMagicNumber,
  getInTheHole:   getInTheHole
}

module.exports = ChargeCodeStore;
