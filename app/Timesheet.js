var React       = require('react');
var Month       = require('./components/Month');
var DateHelper  = require('./utils/DateHelper');
var TimeActions = require('./actions/TimeActions');

var startDate   = new Date(); // new Date(2016,1);
var dateHelper  = new DateHelper(startDate);
var daysInMonth = dateHelper.lastDate();
var startDay    = 1;
var endDay      = 31;

TimeActions.start(startDate,startDay,endDay);

var Timesheet = React.createClass({
  render: function(){
    return (
      <div className="container">
        <Month year={ startDate.getFullYear() } month={ startDate.getMonth() } startDay={ startDay } endDay={ endDay } />
      </div>
    )
  }
});

React.render(
  <Timesheet />,
  document.getElementById('app')
)
