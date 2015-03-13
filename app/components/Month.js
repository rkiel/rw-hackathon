var React = require('react');
var Balance = require('./Balance');

function render(){
  return (
    <div>
      <h3 className="text-center"> Timesheet </h3>
      <table className="table">
        <Balance />
      </table>
    </div>
  );
}

var Month = React.createClass({
  render: render
});

module.exports = Month;
