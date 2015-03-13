var React           = require('react');
var chargeCodeStore = require('../stores/ChargeCodeStore');

function getInitialState(){
  return {
    codes: codes(chargeCodeStore.getList()),
    day:   chargeCodeStore.getDay()
  }
}

function codes(list) {
  var codes = list.map(function(item){
    return item.code;
  });
  return codes;
}

function handleChange(e) {
  if (e.target.value) {
    console.log(e.target.value);
  } else {
    console.log('0');
  }
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
          onChange={this.handleChange}
          value={day.data[code]}
          style={ style.input }
          ref={code}
          type='text'
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
