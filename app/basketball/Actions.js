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

function recordOffense(number,statistic) {
  var action = {
    actionType: Events.RECORD_OFFENSE,
    data:       {number: number, statistic: statistic}
  };
  Dispatcher.viewAction(action);
}

function recordDefense(number,statistic) {
  var action = {
    actionType: Events.RECORD_DEFENSE,
    data:       {number: number, statistic: statistic}
  };
  Dispatcher.viewAction(action);
}

var Actions = {
  moveToActive:   moveToActive,
  moveToInactive: moveToInactive,
  recordOffense:  recordOffense,
  recordDefense:  recordDefense
};

module.exports = Actions;
