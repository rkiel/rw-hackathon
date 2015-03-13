var Events     = require('../constants/Events');
var Dispatcher = require('../dispatcher/Dispatcher');

function change(data) {
  var action = {
    actionType: Events.TIME_CHANGE,
    data:       data
  };
  Dispatcher.viewAction(action);
}

var timeActions = {
  change: change
};

module.exports = timeActions;
