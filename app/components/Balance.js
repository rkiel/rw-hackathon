var React           = require('react');
var ChargeCodeStore = require('../stores/ChargeCodeStore');

function getInitialState(){
  return {
    totals:   totals(ChargeCodeStore.getList())
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
    totals:   totals(ChargeCodeStore.getList())
  });
}

function totals(list) {
  var totals = list.map(function(item){
    return item.total;
  });

  totals = [null].concat(totals);
  totals = totals.concat([null]);
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
