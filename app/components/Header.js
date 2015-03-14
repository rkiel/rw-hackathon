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
  return headings;
}

function render(){
  var headings = this.state.headings.map(function(title, index){
    return (
      <th className='text-right'> {title} </th>
    )
  });

  return (
    <tr key='heading'>
      <th className='text-left'> Day </th>
      <th className='text-right'> Date </th>
      { headings }
      <th className='text-right'> TOTAL </th>
    </tr>
  );
}

var Header = React.createClass({
  getInitialState:      getInitialState,
  render:               render
});

module.exports = Header;

