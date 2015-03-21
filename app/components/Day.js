var React           = require('react');
var ChargeCodeStore = require('../stores/ChargeCodeStore');
var TimeActions     = require('../actions/TimeActions');
var DateHelper      = require('../utils/DateHelper');
var Format          = require('../utils/Format');

function getInitialState(){
  return {
    codes: codes(ChargeCodeStore.getList()),
    day:   ChargeCodeStore.getDay(this.props.date)
  }
}

function propTypes() {
  return {
    date: React.PropTypes.object.isRequired
  };
}

function componentDidMount() {
  ChargeCodeStore.addListener(this.changeChargeCodes);
}

function componentWillUnmount() {
 ChargeCodeStore.removeChangeListener(this.changeChargeCodes);
}

function changeChargeCodes() {
  this.setState({
    codes: codes(ChargeCodeStore.getList()),
    day:   ChargeCodeStore.getDay(this.props.date)
  });
}

function codes(list) {
  var codes = list.map(function(item){
    return item.code;
  });
  return codes;
}

function handleChange(e) {
  var userInput = e.target.value;
  var userValue = 0;
  if (userInput.match(/^\d$/) ||
      userInput.match(/^\d\d$/) ||
      userInput.match(/^\d\.\d?\d?$/) ||
      userInput.match(/^\d\d\.\d?\d?$/)) {
    userValue = parseInt((parseFloat(userInput) * 100).toFixed());
  } else {
    userInput = '';
    userValue = null;
  }
  var code = e.target.attributes['data-charge-code'].value;
  var date = parseInt(e.target.attributes['data-charge-date'].value);
  TimeActions.change({userInput: userInput, userValue: userValue, code: code, date: date});
}

function render(){
  var dateHelper = new DateHelper(this.props.date);
  var style = {
    input:  { textAlign: 'right' },
    row:    { },
    status: { }
  };

  var lightYellow = "#FFF8DC";
  var darkYellow  = "#ffeb99";
  var greyBlue    = "#B0C4DE";
  var red         = "red"
  var green       = "green"
  var blue        = "#4b79b4";

  var color = null;
  if (dateHelper.isToday()) {
    color = lightYellow;
  } else if (dateHelper.isWeekend()) {
    color = greyBlue;
  } else {
    color = lightYellow;
  }

  if (color) {
    style.row.backgroundColor = color
  }

  var day = this.state.day;

  var color           = null;
  var fullDay         = (Format.toPennies(8) <= day.total);
  var extraDay        = (0 < day.total && day.expected === 0);
  var notFullDay      = (0 < day.total && day.total < Format.toPennies(8));
  var expectedFullDay = (day.expected > 0);
  if (expectedFullDay && notFullDay) {
    color = red;
  } else if (fullDay || extraDay) {
    color = blue;
  }
  if (color) {
    style.status.color = color
    style.input.color  = color
  }

  var actuals = this.state.codes.map(function(code) {
    var userInput = (day.data[code] ? day.data[code].userInput : null);
    return (
      <td className='text-right'>
        <input
          placeholder={code}
          data-charge-date={this.props.date.getDate()}
          data-charge-code={code}
          onChange={this.handleChange}
          value={userInput}
          style={ style.input }
          ref={code}
          type='text'
          size={ 5 }
          maxLength={ 5 }
          className='form-control' />
      </td>
    );
  }.bind(this));
  return (
    <tr key={this.props.date.getDate()} style={ style.row } >
      <td className='text-left'> <span style={style.status}>{dateHelper.dayOfWeek()}</span> </td>
      <td className='text-right'> <span style={style.status}>{this.props.date.getDate()}</span> </td>
      { actuals }
      <td className='text-right'><strong style={style.status}>{Format.toDollars(day.total)}</strong></td>
    </tr>
  );
}

var Day = React.createClass({
  getInitialState:      getInitialState,
  propTypes:            propTypes(),
  componentDidMount:    componentDidMount,
  componentWillUnmount: componentWillUnmount,
  changeChargeCodes:    changeChargeCodes,
  handleChange:         handleChange,
  render:               render
});

module.exports = Day;
