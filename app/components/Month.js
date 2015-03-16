var React           = require('react');
var Header          = require('./Header');
var Balance         = require('./Balance');
var Day             = require('./Day');
var DateHelper      = require('../utils/DateHelper');
var ChargeCodeStore = require('../stores/ChargeCodeStore');
var Format          = require('../utils/Format');

function propTypes() {
  return {
    year:     React.PropTypes.number.isRequired,
    month:    React.PropTypes.number.isRequired,
    startDay: React.PropTypes.number.isRequired,
    endDay:   React.PropTypes.number.isRequired
  };
}

function getInitialState(){
  return {
    magicNumber: ChargeCodeStore.getMagicNumber(),
    inTheHole:   ChargeCodeStore.getInTheHole(),
    countDown:   ChargeCodeStore.getCountDown()
  }
}

function componentDidMount() {
  ChargeCodeStore.addListener(this.changeChargeCodes);
}

function componentWillUnmount() {
 ChargeCodeStore.removeChangeListener(this.changeChargeCodes);
}

function changeChargeCodes() {
  this.setState({
    magicNumber: ChargeCodeStore.getMagicNumber(),
    inTheHole:   ChargeCodeStore.getInTheHole(),
    countDown:   ChargeCodeStore.getCountDown()
  });
}

function render(){
  var dates = [ ];
  for (var i = this.props.startDay; i <= this.props.endDay; i++) {
    var date = new Date(this.props.year, this.props.month, i);
    dates.push( date );
  }
  var days = dates.map(function(date) {
    return (
      <Day date={ date } />
    );
  });

  var dateHelper = new DateHelper(new Date(this.props.year,this.props.month));

  var style = {
    magicNumber: { 'color': 'green' },
    countDown:   { 'color': 'green' },
    inTheHole:   { 'color': (this.state.inTheHole < 0 ? 'red' : 'green') }
  }

  var titleBar = (
      <div className='row'>
        <div className="col-xs-4 text-left" style={style.inTheHole}><h3>{Format.toDollars(this.state.inTheHole)}</h3></div>
        <div className="col-xs-4 text-center"><h3>{dateHelper.month()} {this.props.year}</h3></div>
        <div className="col-xs-4 text-right" style={style.countDown}><h3>{Format.toDollars(this.state.countDown)}</h3></div>
      </div>
      );

  return (
    <div>
      { titleBar }
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
      { titleBar }
    </div>
  );
}

var Month = React.createClass({
  getInitialState:      getInitialState,
  componentDidMount:    componentDidMount,
  componentWillUnmount: componentWillUnmount,
  changeChargeCodes:    changeChargeCodes,
  propTypes:            propTypes(),
  render:               render
});

module.exports = Month;
