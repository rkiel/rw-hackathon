var Events     = require('../constants/Events');
var Dispatcher = require('../dispatcher/Dispatcher');

var _store = {
  list: [
    { title: 'Project 1', code: 'project1', direct: true,  total: 5 },
    { title: 'Project 2', code: 'project2', direct: true,  total: 2 },
    { title: 'PTO',       code: 'pto',      direct: false, total: 1 },
    { title: 'Holiday',   code: 'holiday',  direct: false, total: 0 },
    { title: 'Training',  code: 'training', direct: false, total: 0 }
  ],

  day: {
    date: 27,
    data: {
      project1: 5,
      project2: 2,
      pto:      1
    },
    total: 8
  }
};

function getList() {
  return _store.list;
}

function getDay() {
  return _store.day;
}

function timeChange(data) {
  console.log(data);
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

Dispatcher.register(handleDispatch);

var ChargeCodeStore = {
  getDay:  getDay,
  getList: getList
}

module.exports = ChargeCodeStore;
