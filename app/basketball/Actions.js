var Events     = require('./Constants');
var Dispatcher = require('./Dispatcher');


function moveToInactive(number) {
  var action = {
    actionType: Events.MOVE_TO_INACTIVE,
    data:       number
  };
  Dispatcher.viewAction(action);
}

function moveToActive(number) {
  var action = {
    actionType: Events.MOVE_TO_ACTIVE,
    data:       number
  };
  Dispatcher.viewAction(action);
}

var Actions = {
  moveToActive:   moveToActive,
  moveToInactive: moveToInactive
};

module.exports = Actions;
