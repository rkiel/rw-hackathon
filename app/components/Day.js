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

function render(){
  var day = this.state.day;
  var actuals = this.state.codes.map(function(code) {
    return (
      <td className='text-right'>
        <input
          ref={code}
          type='text'
          value={day.data[code]}
          style={ {'text-align': 'right'} }
          className='form-control' />
      </td>
    );
  });
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
  render:          render
});

module.exports = Day;
