var Dispatcher    = require('flux').Dispatcher;
var AppDispatcher = new Dispatcher();

function viewAction(action){
  this.dispatch({
    source: 'VIEW_ACTION',
    action: action
  });
};

AppDispatcher.viewAction = viewAction;

module.exports = AppDispatcher;
