var React           = require('react');
var ChargeCodeStore = require('../stores/ChargeCodeStore');

function getInitialState(){
  return {
    headings: headings(ChargeCodeStore.getList()),
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
    headings: headings(ChargeCodeStore.getList()),
    totals:   totals(ChargeCodeStore.getList())
  });
}

function headings(list) {
  var headings = list.map(function(item){
    return item.title;
  });

  headings = ['DAY'].concat(headings);
  headings = headings.concat(['TOTAL']);
  return headings;
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
  var headings = this.state.headings.map(function(title, index){
    return (
      <th key={title} className='text-right'> {title} </th>
    )
  });

  var totals = this.state.totals.map(function(total, index) {
    return (
      <th className='text-right'> {total} </th>
    );
  });

  return (
    <thead>
      <tr>
        { headings }
      </tr>
      <tr>
        { totals }
      </tr>
    </thead>
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
