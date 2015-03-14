var React           = require('react');
var ChargeCodeStore = require('../stores/ChargeCodeStore');

function getInitialState(){
  return {
    headings: headings(ChargeCodeStore.getList())
  }
}

function headings(list) {
  var headings = list.map(function(item){
    return item.title;
  });

  headings = ['','DAY'].concat(headings);
  headings = headings.concat(['TOTAL']);
  return headings;
}

function render(){
  var headings = this.state.headings.map(function(title, index){
    return (
      <th key={title} className='text-right'> {title} </th>
    )
  });

  return (
    <tr>
      { headings }
    </tr>
  );
}

var Header = React.createClass({
  getInitialState:      getInitialState,
  render:               render
});

module.exports = Header;

