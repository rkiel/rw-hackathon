var React   = require('react');
var Header  = require('./Header');
var Balance = require('./Balance');
var Day     = require('./Day');

function render(){
  var dates = [ ];
  for (var i = 1; i <= 31; i++) {
    dates.push(i);
  }
  var days = dates.map(function(date) {
    return (
      <Day date={ date } />
    );
  });

  return (
    <div>
      <h3 className="text-center"> Timesheet </h3>
      <table className="table">
        <thead>
          <Header />
          <Balance />
        </thead>
        <tbody>
          { days }
        </tbody>
        <tfoot>
          <Balance />
          <Header />
        </tfoot>
      </table>
    </div>
  );
}

var Month = React.createClass({
  render: render
});

module.exports = Month;
