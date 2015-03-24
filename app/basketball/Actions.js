var Events     = require('./Constants');
var Dispatcher = require('./Dispatcher');


function moveToInactive(number) {
  var action = {
    actionType: Events.MOVE_TO_INACTIVE,
    data:       number
  };
  Dispatcher.viewAction(action);
}

var Actions = {
  moveToInactive: moveToInactive
};

module.exports = Actions;
