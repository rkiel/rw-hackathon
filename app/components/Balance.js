var React           = require('react');
var ChargeCodeStore = require('../stores/ChargeCodeStore');

function getInitialState(){
  return {
    totals:   totals(ChargeCodeStore.getList(), ChargeCodeStore.getGrandTotal())
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
    totals:   totals(ChargeCodeStore.getList(), ChargeCodeStore.getGrandTotal())
  });
}

function totals(list,grandTotal) {
  var totals = list.map(function(item){
    return item.total;
  });

  totals = totals.concat([grandTotal]);
  return totals;
}

function render(){
  var totals = this.state.totals.map(function(total, index) {
    return (
      <th className='text-right'> {total} </th>
    );
  });

  return (
    <tr>
      <th className='text-left'> </th>
      <th className='text-right'> </th>
      { totals }
    </tr>
  );
}

var Balance = React.createClass({
  getInitialState:      getInitialState,
  componentDidMount:    componentDidMount,
  componentWillUnmount: componentWillUnmount,
  changeChargeCodes:    changeChargeCodes,
  render:               render
});

module.exports = Balance;
