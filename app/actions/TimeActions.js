var Events     = require('../constants/Events');
var Dispatcher = require('../dispatcher/Dispatcher');

function change(data) {
  Dispatcher.viewAction({
    actionType: Events.TIME_CHANGE,
    data:       data
  });
}

var timeActions = {
  change: change
};

module.exports = timeActions;
