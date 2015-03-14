var React      = require('react');
var Header     = require('./Header');
var Balance    = require('./Balance');
var Day        = require('./Day');
var DateHelper = require('../utils/DateHelper');

function propTypes() {
  return {
    year:  React.PropTypes.number.isRequired,
    month: React.PropTypes.number.isRequired,
    days:  React.PropTypes.number.isRequired
  };
}


function render(){
  var dates = [ ];
  for (var i = 1; i <= this.props.days; i++) {
    dates.push( new Date(this.props.year, this.props.month, i) );
  }
  var days = dates.map(function(date) {
    return (
      <Day date={ date } />
    );
  });

  var dateHelper = new DateHelper(new Date(this.props.year,this.props.month));

  return (
    <div>
      <h3 className="text-center"> {dateHelper.month()} {this.props.year} </h3>
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
  propTypes: propTypes(),
  render:    render
});

module.exports = Month;
