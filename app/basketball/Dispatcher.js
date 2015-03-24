var Dispatcher    = require('flux').Dispatcher;
var AppDispatcher = new Dispatcher();

function systemAction(action){
  this.dispatch({
    source: 'SYSTEM_ACTION',
    action: action
  });
};

function viewAction(action){
  this.dispatch({
    source: 'VIEW_ACTION',
    action: action
  });
};

AppDispatcher.systemAction = systemAction;
AppDispatcher.viewAction   = viewAction;

module.exports = AppDispatcher;
