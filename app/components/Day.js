var React           = require('react');
var ChargeCodeStore = require('../stores/ChargeCodeStore');
var TimeActions     = require('../actions/TimeActions');

function getInitialState(){
  return {
    codes: codes(ChargeCodeStore.getList()),
    day:   ChargeCodeStore.getDay()
  }
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
  var style = {
    input: { textAlign: 'right' }
  };
  var day = this.state.day;
  var actuals = this.state.codes.map(function(code) {
    return (
      <td className='text-right'>
        <input
          data-charge-date={day.date}
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
    <tr>
      <td key={day.date} className='text-right'> {day.date} </td>
      { actuals }
      <td key={day.total} className='text-right'> {day.total} </td>
    </tr>
  );
}

var Day = React.createClass({
  getInitialState: getInitialState,
  handleChange:    handleChange,
  render:          render
});

module.exports = Day;
