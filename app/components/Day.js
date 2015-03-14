var React           = require('react');
var ChargeCodeStore = require('../stores/ChargeCodeStore');
var TimeActions     = require('../actions/TimeActions');
var DateHelper      = require('../utils/DateHelper');

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
  var value = 0;
  if (e.target.value) {
    value = e.target.value;
    if (isNaN(value)) {
      value = 0;
    } else {
      value = parseInt(value);
    }
  }
  var code = e.target.attributes['data-charge-code'].value;
  var date = parseInt(e.target.attributes['data-charge-date'].value);
  TimeActions.change({value: value, code: code, date: date});
}

function render(){
  var dateHelper = new DateHelper(this.props.date);
  var style = {
    input: { textAlign: 'right' },
    row:   { }
  };

  if (dateHelper.isToday()) {
    style.row = {
      'backgroundColor': "#B0C4DE"
    }
  } else if (dateHelper.isWeekend()) {
    style.row = {
      'backgroundColor': "#FFF8DC"
    }
  }

  var day = this.state.day;
  var actuals = this.state.codes.map(function(code) {
    return (
      <td className='text-right'>
        <input
          placeholder={code}
          data-charge-date={this.props.date.getDate()}
          data-charge-code={code}
          onChange={this.handleChange}
          value={day.data[code]}
          style={ style.input }
          ref={code}
          type='text'
          size={ 2 }
          maxLength={ 2 }
          className='form-control' />
      </td>
    );
  }.bind(this));
  return (
    <tr key={this.props.date.getDate()} style={ style.row } >
      <td className='text-left'> {dateHelper.dayOfWeek()} </td>
      <td className='text-right'> {this.props.date.getDate()} </td>
      { actuals }
      <td className='text-right'><strong>{day.total}</strong></td>
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
