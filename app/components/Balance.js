var React = require('react');

function render(){
  return (
    <thead>
      <tr>
        <th className='text-right'>DAY</th>
        <th className='text-right'>Account 1</th>
        <th className='text-right'>Account 2</th>
        <th className='text-right'>PTO</th>
        <th className='text-right'>Holiday</th>
        <th className='text-right'>Training</th>
        <th className='text-right'>TOTAL</th>
      </tr>
      <tr>
        <th className='text-right'></th>
        <th className='text-right'></th>
        <th className='text-right'></th>
        <th className='text-right'>80</th>
        <th className='text-right'>80</th>
        <th className='text-right'>24</th>
        <th className='text-right'></th>
      </tr>
    </thead>
  );
}

var Balance = React.createClass({
  render: render
});

module.exports = Balance;
