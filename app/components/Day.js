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
    input: { textAlign: 'right' },
    row:   { }
  };

  var color = null;
  if (dateHelper.isToday()) {
    color = "#B0C4DE"
  } else if (dateHelper.isWeekend()) {
    color = "#FFF8DC"
  }
  if (color) {
    style.row = {
      'backgroundColor': color
    }
  }

  var day = this.state.day;
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
      <td className='text-left'> {dateHelper.dayOfWeek()} </td>
      <td className='text-right'> {this.props.date.getDate()} </td>
      { actuals }
      <td className='text-right'><strong>{Format.toDollars(day.total)}</strong></td>
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
