var Events     = require('../constants/Events');
var Dispatcher = require('../dispatcher/Dispatcher');

function start(date,startDay,endDay) {
  var action = {
    actionType: Events.TIME_START,
    data:       {date: date, startDay: startDay, endDay: endDay}
  };
  Dispatcher.systemAction(action);
}

function change(data) {
  var action = {
    actionType: Events.TIME_CHANGE,
    data:       data
  };
  Dispatcher.viewAction(action);
}

var timeActions = {
  start:  start,
  change: change
};

module.exports = timeActions;
