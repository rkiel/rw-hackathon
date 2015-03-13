var React = require('react');
var chargeCodeStore = require('../stores/ChargeCodeStore');

function getInitialState(){
  return {
    list: chargeCodeStore.getList()
  }
}


function render(){
  var headings = this.state.list.map(function(item){
    return item.title;
  });

  headings = ['DAY'].concat(headings);
  headings = headings.concat(['TOTAL']);

  headings = headings.map(function(title, index){
    return (
      <th key={title} className='text-right'> {title} </th>
    )
  });

  var totals = this.state.list.map(function(item){
    return item.total;
  });
  totals = [null].concat(totals);
  totals = totals.concat([null]);
  totals = totals.map(function(total, index) {
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
  getInitialState: getInitialState,
  render:          render
});

module.exports = Balance;
