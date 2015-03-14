var React      = require('react');
var Month      = require('./components/Month');
var DateHelper = require('./utils/DateHelper');

var App = React.createClass({
  render: function(){
    var startDate   = new Date(); // new Date(2016,1);
    var dateHelper  = new DateHelper(startDate);
    var daysInMonth = dateHelper.lastDate();

    return (
      <div className="container">
        <Month year={ startDate.getFullYear() } month={ startDate.getMonth() } days={ daysInMonth } />
      </div>
    )
  }
});

React.render(
  <App />,
  document.getElementById('app')
)
