var React   = require('react');
var Balance = require('./Balance');
var Day     = require('./Day');

function render(){
  return (
    <div>
      <h3 className="text-center"> Timesheet </h3>
      <table className="table">
        <Balance />
        <tbody>
          <Day />
        </tbody>
      </table>
    </div>
  );
}

var Month = React.createClass({
  render: render
});

module.exports = Month;
